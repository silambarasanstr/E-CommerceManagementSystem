import { useEffect, useState } from "react";
import { Mail, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { getProfile } from "../services/authService";

type Profile = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

type ProfileResponse = {
  user: Profile;
};

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const data: ProfileResponse = await getProfile();

        // API response is { user: {...} }
        setProfile(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-sm text-slate-500">
          Profile not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-slate-50">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">

          {/* Blue Header */}
          <div className="px-6 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center gap-4">

              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="object-cover w-16 h-16 rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  {profile.name}
                </h2>

                <p className="text-sm text-blue-100">
                  {profile.email}
                </p>
              </div>

            </div>
          </div>

          {/* Details */}
          <div className="p-6">

            <h3 className="mb-4 text-sm font-semibold text-slate-700">
              Personal Information
            </h3>

            <div className="space-y-4">

              {/* Name */}
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-slate-50 border-slate-100">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Full Name
                  </p>

                  <p className="text-sm font-medium text-slate-800">
                    {profile.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-slate-50 border-slate-100">
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Email Address
                  </p>

                  <p className="text-sm font-medium text-slate-800">
                    {profile.email}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;