import ukTradeLeadsLogo from '../../assets/brand/uk-trade-leads-logo.png';
import './PoweredByUKTradeLeads.css';

export interface PoweredByUKTradeLeadsProps {
  className?: string;
}

const PoweredByUKTradeLeads = ({ className }: PoweredByUKTradeLeadsProps) => (
  <a
    href="https://uktradeleads.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Powered by UK Trade Leads"
    className={className ? `uktl-powered-by ${className}` : 'uktl-powered-by'}
  >
    <span className="uktl-powered-by__label">Powered by</span>
    <img
      src={ukTradeLeadsLogo}
      alt="UK Trade Leads"
      width="1507"
      height="243"
      loading="lazy"
      className="uktl-powered-by__logo"
    />
  </a>
);

export default PoweredByUKTradeLeads;
