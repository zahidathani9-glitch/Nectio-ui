import AppLayout from "../components/layout/appLayout";
import HeroRecommendation from "../components/home/HeroRecommendation";
import UpcomingConversations from "../components/home/UpcomingConversations";
import ExploreOpportunities from "../components/home/ExploreOpportunities";

export default function HomePage() {
  return (
    <AppLayout>

      <HeroRecommendation />

      <UpcomingConversations />

      <ExploreOpportunities />

    </AppLayout>
  );
}