"use client";
import { Globe3D, GlobeMarker } from "./ui/3d-globe";

const sampleMarkers: GlobeMarker[] = [
  // Américas
  { lat: -15.7801, lng: -47.9292, src: "https://flagcdn.com/w80/br.png", label: "Brasil" },
  { lat: 37.0902, lng: -95.7129, src: "https://flagcdn.com/w80/us.png", label: "Estados Unidos" },
  { lat: -34.9011, lng: -56.1645, src: "https://flagcdn.com/w80/uy.png", label: "Uruguai" },
  { lat: -34.6037, lng: -58.3816, src: "https://flagcdn.com/w80/ar.png", label: "Argentina" },
  { lat: -33.4489, lng: -70.6693, src: "https://flagcdn.com/w80/cl.png", label: "Chile" },
  { lat: 4.7110, lng: -74.0721, src: "https://flagcdn.com/w80/co.png", label: "Colômbia" },
  { lat: 14.0723, lng: -87.1921, src: "https://flagcdn.com/w80/hn.png", label: "Honduras" },
  { lat: 10.4806, lng: -66.8983, src: "https://flagcdn.com/w80/ve.png", label: "Venezuela" },
  { lat: 8.9833, lng: -79.5167, src: "https://flagcdn.com/w80/pa.png", label: "Panamá" },
  { lat: -12.0464, lng: -77.0428, src: "https://flagcdn.com/w80/pe.png", label: "Peru" },
  { lat: 13.6929, lng: -89.2182, src: "https://flagcdn.com/w80/sv.png", label: "El Salvador" },

  // Europa
  { lat: 37.9838, lng: 23.7275, src: "https://flagcdn.com/w80/gr.png", label: "Grécia" },
  { lat: 51.5074, lng: -0.1278, src: "https://flagcdn.com/w80/gb.png", label: "Reino Unido" },
  { lat: 41.9028, lng: 12.4964, src: "https://flagcdn.com/w80/it.png", label: "Itália" },
  { lat: 53.3498, lng: -6.2603, src: "https://flagcdn.com/w80/ie.png", label: "Irlanda" },
  { lat: 52.5200, lng: 13.4050, src: "https://flagcdn.com/w80/de.png", label: "Alemanha" },
  { lat: 50.8503, lng: 4.3517, src: "https://flagcdn.com/w80/be.png", label: "Bélgica" },
  { lat: 60.1695, lng: 24.9354, src: "https://flagcdn.com/w80/fi.png", label: "Finlândia" },
  { lat: 59.3293, lng: 18.0686, src: "https://flagcdn.com/w80/se.png", label: "Suécia" },
  { lat: 55.6761, lng: 12.5683, src: "https://flagcdn.com/w80/dk.png", label: "Dinamarca" },
  { lat: 38.7223, lng: -9.1393, src: "https://flagcdn.com/w80/pt.png", label: "Portugal" },
  { lat: 48.8566, lng: 2.3522, src: "https://flagcdn.com/w80/fr.png", label: "França" },
  { lat: 40.4168, lng: -3.7038, src: "https://flagcdn.com/w80/es.png", label: "Espanha" },
  { lat: 56.9496, lng: 24.1052, src: "https://flagcdn.com/w80/lv.png", label: "Letônia" },
  { lat: 52.3676, lng: 4.9041, src: "https://flagcdn.com/w80/nl.png", label: "Países Baixos" },
  { lat: 48.2082, lng: 16.3738, src: "https://flagcdn.com/w80/at.png", label: "Áustria" },
  { lat: 46.0569, lng: 14.5058, src: "https://flagcdn.com/w80/si.png", label: "Eslovênia" },
  { lat: 48.1486, lng: 17.1077, src: "https://flagcdn.com/w80/sk.png", label: "Eslováquia" },
  { lat: 53.9006, lng: 27.5590, src: "https://flagcdn.com/w80/by.png", label: "Belarus" },
  { lat: 42.6629, lng: 21.1655, src: "https://flagcdn.com/w80/xk.png", label: "Kosovo" },
  { lat: 42.4304, lng: 19.2594, src: "https://flagcdn.com/w80/me.png", label: "Montenegro" },
  { lat: 45.8150, lng: 15.9819, src: "https://flagcdn.com/w80/hr.png", label: "Croácia" },
  { lat: 46.8182, lng: 8.2275, src: "https://flagcdn.com/w80/ch.png", label: "Suíça" },
  { lat: 50.0755, lng: 14.4378, src: "https://flagcdn.com/w80/cz.png", label: "República Tcheca" },
  { lat: 52.2297, lng: 21.0122, src: "https://flagcdn.com/w80/pl.png", label: "Polônia" },
  { lat: 59.4370, lng: 24.7536, src: "https://flagcdn.com/w80/ee.png", label: "Estônia" },
  { lat: 44.4268, lng: 26.1025, src: "https://flagcdn.com/w80/ro.png", label: "Romênia" },
  { lat: 54.6872, lng: 25.2797, src: "https://flagcdn.com/w80/lt.png", label: "Lituânia" },
  { lat: 35.8989, lng: 14.5146, src: "https://flagcdn.com/w80/mt.png", label: "Malta" },
  { lat: 35.1856, lng: 33.3823, src: "https://flagcdn.com/w80/cy.png", label: "Chipre" },
  { lat: 39.9334, lng: 32.8597, src: "https://flagcdn.com/w80/tr.png", label: "Turquia" },
  { lat: 42.6977, lng: 23.3219, src: "https://flagcdn.com/w80/bg.png", label: "Bulgária" },
  { lat: 47.4979, lng: 19.0402, src: "https://flagcdn.com/w80/hu.png", label: "Hungria" },
  { lat: 43.8563, lng: 18.4131, src: "https://flagcdn.com/w80/ba.png", label: "Bósnia e Herzegovina" },
];

export default function Globe3DDemo() {
  return (
    <div className="w-full bg-transparent overflow-hidden rounded-[3rem]">
      <Globe3D
        markers={sampleMarkers}
        config={{
          atmosphereColor: "#4da6ff",
          atmosphereIntensity: 15,
          bumpScale: 3,
          autoRotateSpeed: 0.5,
          enableZoom: true,
          minDistance: 3,
          maxDistance: 8,
          radius: 1.8,
        }}
      />
    </div>
  );
}
