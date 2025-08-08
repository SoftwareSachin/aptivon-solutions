import React from 'react';
import SectionWithMockup from './section-with-mockup';
import profileImage from '@/assets/chetan-profile.png';
import logoGif from '@/assets/new-logo.gif';

// Create a simple gradient image for better visibility
const createGradientImage = (color1: string, color2: string, content: string, gradId: string) => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
    <defs>
      <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="400" height="600" fill="url(#${gradId})" rx="20"/>
    <rect x="20" y="20" width="360" height="560" fill="rgba(255,255,255,0.1)" rx="15"/>
    <text x="200" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">${content}</text>
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
    primaryImageSrc: createGradientImage('#FF6B35', '#667eea', 'OPPB Payment App', 'grad1'),
    secondaryImageSrc: createGradientImage('#1A202C', '#2D3748', 'Network Architecture', 'grad2'),
};

export function FeaturedOPPBProject() {
    return (
        <SectionWithMockup
            title={oppbProjectData.title}
            description={oppbProjectData.description}
            youtubeUrl="https://www.youtube.com/embed/l-z64oz_sa8"
            showVideo={true}
            reverseLayout={false}
        />
    );
}

export default FeaturedOPPBProject;