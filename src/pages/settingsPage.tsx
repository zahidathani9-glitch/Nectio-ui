import AppLayout from "../components/layout/appLayout";
import AppearanceCard from "../components/settings/AppearanceCard";
import AccountCard from "../components/settings/AccountCard";
import AboutCard from "../components/settings/AboutCard";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your account and personalize your experience.
          </p>
        </div>

        <AppearanceCard />

        <AccountCard />

        <AboutCard />

      </div>
    </AppLayout>
  );
}