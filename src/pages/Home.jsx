import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import GroupCard from '../components/GroupCard';
import PopularCategories from '../components/PopularCategories';
import Faq from '../components/Faq';
import { Typewriter } from 'react-simple-typewriter';
import { Loader2 } from 'lucide-react';
import HowHobbyHubWorks from '../components/HowHobbyHubWorks';
import FeaturedGroups from '../components/FeaturedGroups';

const Home = () => {
    const [groups, setGroups] = useState([]); // Initialize as empty array
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://hobby-hub-server-psi-bay.vercel.app/groups');

                const data = await response.json();

                // Debug: See exactly what the API sends back
                console.log("API Response:", data);

                // Check if data is actually an array before setting state
                if (Array.isArray(data)) {
                    setGroups(data);
                } else if (data && typeof data === 'object' && Array.isArray(data.groups)) {
                    // If your API wraps the array in an object like { groups: [] }
                    setGroups(data.groups);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroups();
    }, []);

    return (
        <div>
            <Banner />
            <HowHobbyHubWorks />
            <FeaturedGroups groups={groups} isLoading={isLoading} />
            <PopularCategories />
            <Faq />
        </div>
    );
};

export default Home;