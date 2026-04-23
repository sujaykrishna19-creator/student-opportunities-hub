import { useState, useMemo } from 'react'
import data from './data.json'
import './index.css'

interface Opportunity {
  id: number;
  title: string;
  provider: string;
  dates: string;
  time: string;
  audience: string;
  format: string;
  location: string;
  apply: string;
  overview: string;
  how_to_apply: string;
  links_contacts: string;
}

const CATEGORIES = [
  "All Categories",
  "Technology & Computer Science",
  "Medicine, Healthcare & Psychology",
  "Business, Finance & Entrepreneurship",
  "Design & Marketing",
  "Engineering & Aviation",
  "Law",
  "General/Cross-Sector"
];

const categoryKeywords: Record<string, string[]> = {
  "Technology & Computer Science": ["AI", "Computer Science", "Gaming", "VR", "Tech", "Excel", "Software", "Generative AI", "Data"],
  "Medicine, Healthcare & Psychology": ["Medicine", "Healthcare", "Psychology", "Doctor", "Medical", "Dentistry", "Clinical", "UCAT", "Healthtech"],
  "Business, Finance & Entrepreneurship": ["Business", "Finance", "Entrepreneurship", "Venture Capital", "Fintech", "WallStreet", "Corporate", "Financial", "Market"],
  "Design & Marketing": ["Design", "Marketing", "Brand", "UI/UX", "Art", "Architect"],
  "Engineering & Aviation": ["Engineering", "Aviation", "Energy", "Sustainability", "STEM"],
  "Law": ["Lawyer", "Law", "LNAT", "Legal"],
};

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [selectedItem, setSelectedItem] = useState<Opportunity | null>(null)

  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.overview.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesCategory = false;
      if (categoryFilter === 'All Categories') {
        matchesCategory = true;
      } else if (categoryFilter === 'General/Cross-Sector') {
        // If it doesn't match any of the strict specific categories, we put it in general
        const textToSearch = (item.title + " " + item.overview).toLowerCase();
        let matchedSpecific = false;
        for (const cat of Object.keys(categoryKeywords)) {
          if (categoryKeywords[cat].some(kw => textToSearch.includes(kw.toLowerCase()))) {
            matchedSpecific = true;
            break;
          }
        }
        matchesCategory = !matchedSpecific;
      } else {
        const keywords = categoryKeywords[categoryFilter] || [];
        const textToSearch = (item.title + " " + item.overview).toLowerCase();
        matchesCategory = keywords.some(kw => textToSearch.includes(kw.toLowerCase()));
      }
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  if (!hasEntered) {
    return (
      <div className="landing-container">
        {/* Clean Corporate Navigation Bar */}
        <nav className="landing-nav">
          <div className="landing-nav-logos">
            <img src="/logos/gems.png" alt="GEMS Education Logo" className="landing-logo" />
            <img src="/logos/gis_logo.png" alt="GEMS International School Logo" className="landing-logo" />
          </div>
        </nav>

        {/* Minimalist Hero Section */}
        <main className="landing-hero">
          <h1 className="landing-title">Unlock Your Future.</h1>
          <h2 style={{ color: 'var(--gems-secondary)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem' }}>
            Discover 80+ Global Internships & Summer Programs
          </h2>
          
          <div className="landing-text-container">
            {/* Animated KPI Cards Moved to TOP */}
            <div className="kpi-container" style={{ marginBottom: '3rem' }}>
              <div className="kpi-card" style={{ animationDelay: '0.2s' }}>
                <div className="kpi-value">80+</div>
                <div className="kpi-label">Opportunities</div>
              </div>
              <div className="kpi-card" style={{ animationDelay: '0.4s' }}>
                <div className="kpi-value">7</div>
                <div className="kpi-label">Disciplines</div>
              </div>
              <div className="kpi-card" style={{ animationDelay: '0.6s' }}>
                <div className="kpi-value">Global</div>
                <div className="kpi-label">Destinations</div>
              </div>
              <div className="kpi-card" style={{ animationDelay: '0.8s' }}>
                <div className="kpi-value">100%</div>
                <div className="kpi-label">Future-Ready</div>
              </div>
            </div>

            {/* Reduced Paragraph Text */}
            <div className="landing-text" style={{ textAlign: 'center', animation: 'fadeIn 1s ease-out 1s backwards' }}>
              <p style={{ marginBottom: '1.2rem', fontSize: '1.25rem' }}>
                The <strong>GEMS For Life Student Opportunities Hub</strong> is your gateway to curated internships, summer camps, and research fellowships from leading global providers. 
              </p>
              <p>
                Whether you dream of shadowing a doctor, innovating in an AI lab, pitching a business idea, or building your portfolio for elite universities, your journey starts right here. Explore virtual and in-person programs and make your university application truly stand out!
              </p>
            </div>
            
            <button className="landing-btn" onClick={() => setHasEntered(true)} style={{ animation: 'floatUp 1s ease-out 1.2s backwards' }}>
              Explore Opportunities
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      {/* Main Directory Header */}
      <div className="top-bar">
        <div className="brand-container">
          <div className="top-bar-logos">
            <img src="/logos/gems.png" alt="GEMS Education Logo" className="top-bar-logo" />
            <img src="/logos/gis_logo.png" alt="GEMS International School Logo" className="top-bar-logo" />
          </div>
        </div>
      </div>

      <div className="app-container">
        <header>
          <h1>Opportunities Directory</h1>
          <p className="subtitle">Discover 80+ programs, internships, and fellowships to enhance your profile and prepare for university.</p>
        </header>

        <div className="controls">
          <input 
            type="text" 
            placeholder="Search programs, providers, or keywords..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {CATEGORIES.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="grid">
          {filteredData.map((item: any, index: number) => (
            <div 
              className="card" 
              key={item.id}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="card-title">{item.title}</div>
              <div className="card-provider">{item.provider}</div>
              
              <div className="card-tags">
                {item.audience && <span className="tag">{item.audience}</span>}
                {item.format && <span className="tag format">{item.format}</span>}
              </div>
              
              <div className="card-details">
                {item.dates && (
                  <div className="detail-row">
                    <span className="detail-label">Dates:</span>
                    <span>{item.dates.length > 50 ? item.dates.substring(0, 50) + '...' : item.dates}</span>
                  </div>
                )}
                {item.location && item.location !== '—' && (
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              <div className="card-actions">
                <button className="btn" onClick={() => setSelectedItem(item)}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)' }}>
            No opportunities found matching your criteria.
          </div>
        )}

        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedItem(null)}>✕</button>
              <h2>{selectedItem.title}</h2>
              <div className="card-provider" style={{ fontSize: '1.1rem' }}>Provided by {selectedItem.provider}</div>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', flex: 1, minWidth: '200px' }}>
                  <div style={{ color: 'var(--gems-primary)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.2rem' }}>DATES</div>
                  <div style={{ color: 'var(--text-main)' }}>{selectedItem.dates || 'N/A'}</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', flex: 1, minWidth: '200px' }}>
                  <div style={{ color: 'var(--gems-primary)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.2rem' }}>LOCATION</div>
                  <div style={{ color: 'var(--text-main)' }}>{selectedItem.location || 'N/A'}</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', flex: 1, minWidth: '200px' }}>
                  <div style={{ color: 'var(--gems-primary)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.2rem' }}>AUDIENCE</div>
                  <div style={{ color: 'var(--text-main)' }}>{selectedItem.audience || 'N/A'}</div>
                </div>
              </div>

              <h3>Overview</h3>
              <p>{selectedItem.overview}</p>

              <h3>How to Apply</h3>
              <p>{selectedItem.how_to_apply}</p>

              <h3>Links & Contacts</h3>
              <p style={{ wordBreak: 'break-all' }}>{selectedItem.links_contacts}</p>
              
              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <a href={selectedItem.links_contacts.match(/https?:\/\/[^\s]+/)?.[0] || '#'} target="_blank" rel="noopener noreferrer" className="btn" style={{ maxWidth: '300px', padding: '1rem' }}>
                  Apply Now / Visit Website
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
