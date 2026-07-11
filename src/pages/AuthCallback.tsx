import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuth = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                navigate("/login", { replace: true });
                return;
            }

            const { data: profile, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("user_id", user.id)
                .maybeSingle();

            if (error) {
                console.error(error);
                navigate("/login", { replace: true });
                return;
            }

            // New Google user
            if (!profile) {
                const { error: insertError } = await supabase
                    .from("profiles")
                    .upsert(
                        {
                            user_id: user.id,
                            nectio_id: `NECTIO-${user.id.slice(0, 8)}`,
                            full_name: user.user_metadata.full_name ?? "",
                            email: user.email ?? "",
                            photo_url: user.user_metadata.avatar_url ?? "",
                            onboarding_completed: false,
                        },
                        {
                            onConflict: "user_id",
                        }
                    );

                if (insertError) {
                    console.error(insertError);
                    alert(insertError.message);
                    return;
                }

                // Wait until the profile can actually be read
                const { data: newProfile } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("user_id", user.id)
                    .single();

                if (!newProfile) {
                    alert("Profile creation failed.");
                    return;
                }

                navigate("/profile", { replace: true });
                return;
            }

            // Existing user
            if (!profile.onboarding_completed) {
                navigate("/profile", { replace: true });
            } else {
                navigate("/home", { replace: true });
            }
        };

        handleOAuth();
    }, [navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            Loading...
        </div>
    );
}