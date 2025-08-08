import React from 'react';
import SectionWithMockup from './section-with-mockup';
import dashboardOverview from '@/assets/dashboard-overview_1752170711656.png';
import networkTopology from '@/assets/network-topology_1752170742561.png';

// Data for the featured project
const featuredProjectData = {
    title: (
        <>
            Azure Hub-and-Spoke
            <br />
            Network Automation
        </>
    ),
    description: (
        <>
            Comprehensive enterprise-grade cloud infrastructure platform
            <br />
            with automated network provisioning, real-time monitoring,
            <br />
            and intelligent compliance management for scalable
            <br />
            multi-region deployments and secure connectivity.
        </>
    ),
    primaryImageSrc: dashboardOverview,
    secondaryImageSrc: networkTopology,
};

export function FeaturedProject() {
    return (
        <SectionWithMockup
            title={featuredProjectData.title}
            description={featuredProjectData.description}
            primaryImageSrc={featuredProjectData.primaryImageSrc}
            secondaryImageSrc={featuredProjectData.secondaryImageSrc}
            reverseLayout={false}
        />
    );
}

export default FeaturedProject;