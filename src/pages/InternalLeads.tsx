import { useCallback, useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Inbox, KeyRound, Loader2, Lock, Mail, Phone, RefreshCw, User } from "lucide-react";

import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { seoData } from "@/data/seoData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { flattenLeadPayload, pickLeadTitle, type FlatField } from "@/lib/leadPayloadDisplay";

const STORAGE_KEY = "pm_internal_leads_token";

type Submission = {
  id: string;
  receivedAt: string;
  payload: unknown;
};

function fieldIcon(key: string) {
  const lower = key.toLowerCase();
  if (lower.includes("email")) return Mail;
  if (lower.includes("phone") || lower.includes("tel")) return Phone;
  if (lower.includes("name")) return User;
  return null;
}

function LeadCard({ submission }: { submission: Submission }) {
  const title = pickLeadTitle(submission.payload);
  const rows = useMemo(() => flattenLeadPayload(submission.payload), [submission.payload]);
  const received = (() => {
    try {
      return format(parseISO(submission.receivedAt), "d MMM yyyy, HH:mm");
    } catch {
      return submission.receivedAt;
    }
  })();

  const headlineFields = rows.filter(
    (r) =>
      /name|email|phone|tel|postcode|zip/i.test(r.key) && r.value && r.value.length < 120
  );
  const detailFields = rows.filter((r) => !headlineFields.includes(r));

  return (
    <Card className="border-border bg-card shadow-sharp overflow-hidden">
      <CardHeader className="space-y-3 border-b border-border bg-secondary/40 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="font-display text-xl tracking-tight text-primary">{title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs">
              <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Received {received}</span>
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
            {submission.id.slice(0, 8)}…
          </Badge>
        </div>
        {headlineFields.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {headlineFields.map((f) => (
              <Badge
                key={f.key}
                variant="secondary"
                className="max-w-full truncate font-normal text-foreground"
              >
                <span className="text-muted-foreground">{formatFieldLabel(f.key)}:</span>{" "}
                <span className="font-medium">{f.value}</span>
              </Badge>
            ))}
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Submitted details
        </p>
        {headlineFields.length > 0 && detailFields.length === 0 ? (
          <p className="text-sm text-muted-foreground">All fields are shown in the summary above.</p>
        ) : (
          <dl className="grid gap-0 sm:grid-cols-2">
            {(detailFields.length ? detailFields : rows).map((field, idx) => (
              <FieldRow key={`${field.key}-${idx}`} field={field} striped={idx % 2 === 0} />
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}

function formatFieldLabel(key: string): string {
  return key
    .replace(/\[[0-9]+\]/g, "")
    .split(/[._]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" · ");
}

function FieldRow({ field, striped }: { field: FlatField; striped: boolean }) {
  const Icon = fieldIcon(field.key);
  return (
    <div
      className={`col-span-1 flex gap-3 border-b border-border px-1 py-3 last:border-b-0 sm:px-2 ${
        striped ? "bg-muted/20" : ""
      }`}
    >
      <div className="mt-0.5 shrink-0 text-muted-foreground">
        {Icon ? <Icon className="h-4 w-4" aria-hidden /> : <span className="inline-block w-4" />}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <dt className="text-xs font-medium text-muted-foreground">{formatFieldLabel(field.key)}</dt>
        <dd className="break-words text-sm text-foreground">{field.value || "—"}</dd>
      </div>
    </div>
  );
}

const InternalLeads = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() =>
    typeof sessionStorage !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) || "" : ""
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const unlocked = Boolean(token);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lead-submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await res.json()) as { submissions?: Submission[]; error?: string };
      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(STORAGE_KEY);
          setToken("");
          setError("Incorrect password or session expired. Sign in again.");
        } else {
          setError(data.error || `Request failed (${res.status})`);
        }
        setSubmissions([]);
        return;
      }
      setSubmissions(data.submissions ?? []);
    } catch {
      setError("Could not load submissions. Check your connection and try again.");
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = password.trim();
    if (!trimmed) {
      setError("Enter the access password.");
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, trimmed);
    setToken(trimmed);
    setPassword("");
    setError(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setSubmissions([]);
    setError(null);
  };

  useEffect(() => {
    if (unlocked) {
      void load();
    }
  }, [unlocked, load]);

  return (
    <Layout>
      <SEOHead
        title={seoData.internalLeads.title}
        description={seoData.internalLeads.description}
        canonicalPath="/internal/leads"
        noindex
      />
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="container relative z-10 mx-auto max-w-3xl px-4">
          {!unlocked ? (
            <Card className="mx-auto max-w-md border-border shadow-sharp-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lock className="h-6 w-6" aria-hidden />
                </div>
                <CardTitle className="font-display text-2xl">Team access</CardTitle>
                <CardDescription>Enter the password to view recent lead submissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUnlock} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pm-leads-password">Password</Label>
                    <Input
                      id="pm-leads-password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-border"
                      placeholder="••••••••"
                    />
                  </div>
                  {error ? (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <Button type="submit" className="w-full" size="lg">
                    <KeyRound className="mr-2 h-4 w-4" aria-hidden />
                    Unlock
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="font-display text-3xl text-primary md:text-4xl">Lead inbox</h1>
                  <p className="mt-1 text-muted-foreground">
                    Submissions captured from your connected webhook pipeline.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => void load()}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" aria-hidden />
                    )}
                    Refresh
                  </Button>
                  <Button type="button" variant="outline" onClick={handleLogout}>
                    Lock
                  </Button>
                </div>
              </div>

              {error ? (
                <Card className="border-destructive/40 bg-destructive/5">
                  <CardContent className="flex items-start gap-3 pt-6">
                    <Inbox className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
                    <p className="text-sm text-destructive">{error}</p>
                  </CardContent>
                </Card>
              ) : null}

              {!loading && submissions.length === 0 && !error ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center py-12 text-center">
                    <Inbox className="mb-3 h-10 w-10 text-muted-foreground" aria-hidden />
                    <p className="font-medium text-foreground">No submissions yet</p>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      When your automation POSTs payloads to{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-xs">/api/lead-submissions</code>{" "}
                      with the ingest secret, they will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : null}

              <div className="space-y-6">
                {submissions.map((s) => (
                  <LeadCard key={s.id} submission={s} />
                ))}
              </div>

              <Separator className="opacity-50" />
              <p className="text-center text-xs text-muted-foreground">
                For security, use a strong password in Cloudflare and rotate it if shared.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default InternalLeads;
