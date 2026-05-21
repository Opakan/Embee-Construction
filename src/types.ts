export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  location: string;
  completionYear: string;
  highlights: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  visualID: 'architectural' | 'structural' | 'construction' | 'consultation';
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  projectType: string;
  message: string;
  createdAt: string;
}

export interface LocationInfo {
  address: string;
  city: string;
  state: string;
  mapEmbedUrl?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
