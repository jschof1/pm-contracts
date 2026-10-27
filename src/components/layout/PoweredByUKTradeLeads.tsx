import './PoweredByUKTradeLeads.css';

export interface PoweredByUKTradeLeadsProps {
  className?: string;
}

const UK_TRADE_LEADS_URL = 'https://uktradeleads.com/services/websites-for-roofers/';

const PoweredByUKTradeLeads = ({ className }: PoweredByUKTradeLeadsProps) => (
  <div className={className ? `uktl-powered-by ${className}` : 'uktl-powered-by'}>
    <span className="uktl-powered-by__label">
      Website by{' '}
      <a href={UK_TRADE_LEADS_URL} target="_blank" rel="noopener" className="uktl-powered-by__link">
        UK Trade Leads
      </a>
    </span>
  </div>
);

export default PoweredByUKTradeLeads;
