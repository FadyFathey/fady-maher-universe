
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const recordVisit = async () => {
      try {
        // Get visitor information
        const userAgent = navigator.userAgent;
        const referrer = document.referrer || null;
        const pagePath = location.pathname;

        // Record the page visit
        await supabase.rpc('record_page_visit', {
          page_path: pagePath,
          user_agent: userAgent,
          referrer: referrer
        });

        console.log('Page visit recorded:', pagePath);
      } catch (error) {
        console.error('Error recording page visit:', error);
      }
    };

    recordVisit();
  }, [location.pathname]);
};
