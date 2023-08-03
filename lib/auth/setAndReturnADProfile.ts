import { AzureADProfile } from 'next-auth/providers/azure-ad';

import { logErr } from '../../util/logger';

interface AdUserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  permissions: string | null;
}

export async function setAndReturnADProfile(
  profile: AzureADProfile,
  tokens: any
): Promise<AdUserProfile> {
  const profilePhotoSize = 48;
  const profilePicture: Response = await fetch(
    `https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    }
  );

  const profileResponse = await fetch(
    `https://graph.microsoft.com/beta/users/${profile.email}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    }
  )
    .then(async (res) => await res.json())
    .catch((err) => logErr(`error in setAndReturnADProfile: ${err}`));

  const department: string | null = profileResponse.department
    ? profileResponse.department
    : null;

  const isProfilePhotoReturned: boolean = profilePicture.ok;
  if (isProfilePhotoReturned) {
    const pictureBuffer: ArrayBuffer = await profilePicture.arrayBuffer();
    const pictureBase64: string = Buffer.from(pictureBuffer).toString('base64');

    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: `data:image/jpeg;base64, ${pictureBase64}`,
      role: 'admin',
      permissions: department,
    };
  } else {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: null,
      role: 'admin',
      permissions: department,
    };
  }
}
