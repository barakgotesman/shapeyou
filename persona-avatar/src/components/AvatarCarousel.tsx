import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/swiper.css";

import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { buildAvatarConfig } from "@/lib/avatar";
import type { Traits } from "@/lib/avatar";

const SAMPLE_PERSONAS: { name: string; traits: Traits }[] = [
  { name: "דניאל",   traits: { extrovert: 80, creative: 70, calm: 60, funny: 40, social: 75, gender: "male"   } },
  { name: "מיה",     traits: { extrovert: 30, creative: 90, calm: 75, funny: 50, social: 40, gender: "female" } },
  { name: "עומר",    traits: { extrovert: 60, creative: 45, calm: 20, funny: 85, social: 65, gender: "male"   } },
  { name: "נועה",    traits: { extrovert: 55, creative: 60, calm: 80, funny: 30, social: 55, gender: "female" } },
  { name: "יונתן",   traits: { extrovert: 90, creative: 55, calm: 35, funny: 70, social: 90, gender: "male"   } },
  { name: "שירה",    traits: { extrovert: 40, creative: 85, calm: 65, funny: 60, social: 45, gender: "female" } },
  { name: "אריאל",   traits: { extrovert: 50, creative: 50, calm: 50, funny: 50, social: 50, gender: "other"  } },
  { name: "תמר",     traits: { extrovert: 20, creative: 75, calm: 90, funny: 25, social: 30, gender: "female" } },
  { name: "רועי",    traits: { extrovert: 75, creative: 30, calm: 40, funny: 90, social: 80, gender: "male"   } },
  { name: "ליאור",   traits: { extrovert: 65, creative: 65, calm: 55, funny: 65, social: 60, gender: "other"  } },
  { name: "יעל",     traits: { extrovert: 35, creative: 80, calm: 70, funny: 45, social: 35, gender: "female" } },
  { name: "אבי",     traits: { extrovert: 85, creative: 40, calm: 25, funny: 75, social: 85, gender: "male"   } },
  { name: "ריטה",    traits: { extrovert: 45, creative: 95, calm: 60, funny: 55, social: 50, gender: "female" } },
  { name: "גל",      traits: { extrovert: 70, creative: 60, calm: 45, funny: 80, social: 70, gender: "other"  } },
  { name: "איתן",    traits: { extrovert: 55, creative: 35, calm: 85, funny: 20, social: 45, gender: "male"   } },
  { name: "דנה",     traits: { extrovert: 25, creative: 70, calm: 55, funny: 35, social: 25, gender: "female" } },
  { name: "בן",      traits: { extrovert: 95, creative: 50, calm: 15, funny: 95, social: 95, gender: "male"   } },
  { name: "טל",      traits: { extrovert: 50, creative: 80, calm: 70, funny: 60, social: 55, gender: "other"  } },
];

const SAMPLES = SAMPLE_PERSONAS.map(p => ({
  ...p,
  config: buildAvatarConfig(p.name, p.traits),
}));

// Triple the slides so Swiper always has enough for loop mode with slidesPerView="auto"
const SLIDES = [...SAMPLES, ...SAMPLES, ...SAMPLES];

export function AvatarCarousel() {
  return (
    <div style={{ background: "linear-gradient(135deg, #1a1740 0%, #2d2870 50%, #1F1B4E 100%)", width: "100%", paddingTop: 16, paddingBottom: 14 }}>
      <p style={{ textAlign: "center", fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.30)", marginBottom: 10 }}>
        כמה מהאווטארים שנוצרו
      </p>

      <Swiper
        modules={[Autoplay, FreeMode]}
        freeMode
        loop
        dir="ltr"
        slidesPerView="auto"
        spaceBetween={6}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={3000}
        style={{ width: "100%" }}
      >
        {SLIDES.map(({ name, config }, i) => (
          <SwiperSlide key={`${name}-${i}`} style={{ width: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 82 }}>
              <AvatarDisplay config={config} size={68} static />
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", fontWeight: 500, lineHeight: 1 }}>{name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
