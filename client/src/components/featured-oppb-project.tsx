import React from 'react';
import SectionWithMockup from './section-with-mockup';

// Create SVG mockups for OPPB payment solution using URL encoding instead of btoa
const createPaymentAppMockup = () => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <rect x="0" y="0" width="400" height="600" rx="40" fill="#1a1a1a"/>
    <rect x="10" y="10" width="380" height="580" rx="30" fill="#fff"/>
    <rect x="10" y="10" width="380" height="40" rx="30" fill="#f8f9fa"/>
    <text x="30" y="35" font-family="Arial, sans-serif" font-size="14" fill="#333">9:41</text>
    <text x="340" y="35" font-family="Arial, sans-serif" font-size="14" fill="#333">100%</text>
    <rect x="10" y="50" width="380" height="60" fill="#FF6B35"/>
    <text x="200" y="85" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">OPPB Pay</text>
    <rect x="30" y="130" width="340" height="80" rx="12" fill="#667eea"/>
    <text x="50" y="155" font-family="Arial, sans-serif" font-size="14" fill="white">Available Balance</text>
    <text x="50" y="185" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">Rs 2,840.50</text>
    <rect x="30" y="230" width="160" height="60" rx="30" fill="#10B981"/>
    <text x="110" y="265" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Send Money</text>
    <rect x="210" y="230" width="160" height="60" rx="30" fill="#3B82F6"/>
    <text x="290" y="265" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Receive</text>
    <rect x="30" y="310" width="340" height="40" rx="20" fill="#FEF3C7"/>
    <circle cx="60" cy="330" r="8" fill="#10B981"/>
    <text x="80" y="335" font-family="Arial, sans-serif" font-size="14" fill="#92400e">Offline Mode Active - No Internet Required</text>
    <text x="30" y="385" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#333">Recent Transactions</text>
    <rect x="30" y="400" width="340" height="50" fill="#f8f9fa"/>
    <circle cx="60" cy="425" r="15" fill="#10B981"/>
    <text x="90" y="420" font-family="Arial, sans-serif" font-size="14" fill="#333">Payment to Merchant</text>
    <text x="90" y="435" font-family="Arial, sans-serif" font-size="12" fill="#666">Via Device-to-Device</text>
    <text x="340" y="425" font-family="Arial, sans-serif" font-size="14" fill="#333" text-anchor="end">-Rs150</text>
    <rect x="30" y="460" width="340" height="50" fill="#f8f9fa"/>
    <circle cx="60" cy="485" r="15" fill="#3B82F6"/>
    <text x="90" y="480" font-family="Arial, sans-serif" font-size="14" fill="#333">Received from Friend</text>
    <text x="90" y="495" font-family="Arial, sans-serif" font-size="12" fill="#666">Via SMS Fallback</text>
    <text x="340" y="485" font-family="Arial, sans-serif" font-size="14" fill="#10B981" text-anchor="end">+Rs500</text>
    <rect x="30" y="530" width="340" height="50" fill="#FF6B35" rx="8"/>
    <text x="200" y="555" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">Powered by NPCI and BHIM Pay</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
};

const createArchitectureDiagram = () => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" style="background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%);">
    <rect width="500" height="400" fill="#1A202C"/>
    <text x="250" y="30" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">OPPB Architecture</text>
    <rect x="50" y="80" width="80" height="100" rx="10" fill="#4A5568" stroke="#FFD700" stroke-width="2"/>
    <text x="90" y="110" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">Device A</text>
    <text x="90" y="125" font-family="Arial, sans-serif" font-size="10" fill="#FFD700" text-anchor="middle">Sender</text>
    <text x="90" y="155" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Offline</text>
    <text x="90" y="170" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Payment</text>
    <rect x="370" y="80" width="80" height="100" rx="10" fill="#4A5568" stroke="#10B981" stroke-width="2"/>
    <text x="410" y="110" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">Device B</text>
    <text x="410" y="125" font-family="Arial, sans-serif" font-size="10" fill="#10B981" text-anchor="middle">Receiver</text>
    <text x="410" y="155" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Mesh</text>
    <text x="410" y="170" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Network</text>
    <line x1="130" y1="130" x2="370" y2="130" stroke="#60A5FA" stroke-width="3" stroke-dasharray="5,5"/>
    <text x="250" y="125" font-family="Arial, sans-serif" font-size="11" fill="#60A5FA" text-anchor="middle">Device-to-Device</text>
    <rect x="220" y="220" width="60" height="80" rx="5" fill="#F59E0B"/>
    <text x="250" y="245" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">SMS</text>
    <text x="250" y="260" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Fallback</text>
    <text x="250" y="275" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">Gateway</text>
    <line x1="130" y1="160" x2="220" y2="250" stroke="#F59E0B" stroke-width="2"/>
    <line x1="370" y1="160" x2="280" y2="250" stroke="#F59E0B" stroke-width="2"/>
    <rect x="200" y="320" width="100" height="60" rx="8" fill="#FF6B35"/>
    <text x="250" y="340" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">NPCI</text>
    <text x="250" y="355" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">Infrastructure</text>
    <text x="250" y="370" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle">BHIM Pay</text>
    <line x1="250" y1="300" x2="250" y2="320" stroke="#FF6B35" stroke-width="3"/>
    <rect x="20" y="330" width="120" height="60" fill="#2D3748" stroke="#4A5568" stroke-width="1" rx="5"/>
    <text x="80" y="345" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">Legend</text>
    <circle cx="35" cy="360" r="3" fill="#FFD700"/>
    <text x="45" y="365" font-family="Arial, sans-serif" font-size="9" fill="white">Offline Capable</text>
    <circle cx="35" cy="375" r="3" fill="#10B981"/>
    <text x="45" y="380" font-family="Arial, sans-serif" font-size="9" fill="white">Mesh Network</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
};

// Data for the OPPB featured project
const oppbProjectData = {
    title: (
        <>
            FEATURED PROJECT
            <br />
            <span className="text-[#FFD700]">OPPB</span>
            <br />
            Offline Payment Solution
        </>
    ),
    description: (
        <>
            Revolutionary NPCI-powered offline payment platform
            <br />
            enabling instant transactions without internet connectivity.
            <br />
            Built with device-to-device mesh networking, SMS fallback,
            <br />
            and cryptographically secured local ledger technology.
        </>
    ),
    primaryImageSrc: createPaymentAppMockup(),
    secondaryImageSrc: createArchitectureDiagram(),
};

export function FeaturedOPPBProject() {
    return (
        <SectionWithMockup
            title={oppbProjectData.title}
            description={oppbProjectData.description}
            primaryImageSrc={oppbProjectData.primaryImageSrc}
            secondaryImageSrc={oppbProjectData.secondaryImageSrc}
            reverseLayout={false}
        />
    );
}

export default FeaturedOPPBProject;