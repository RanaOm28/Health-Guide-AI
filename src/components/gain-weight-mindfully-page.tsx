import { WellnessGoalPage } from "@/components/wellness-goal-page";

const focusStats = [
  { value: "4", label: "nourishing priorities" },
  { value: "+0.25-0.5 lb", label: "weekly pace often sustainable" },
  { value: "80%", label: "focus on fueling and recovery" },
];

const logicCards = [
  {
    title: "Fuel with intention",
    description:
      "Add calorie-dense, nutrient-rich meals and snacks that support recovery, energy, and steady growth without overloading your day.",
    icon: "leaf" as const,
  },
  {
    title: "Strength over stress",
    description:
      "Use resistance training and gradual movement patterns to build lean mass while keeping your routine realistic and sustainable.",
    icon: "activity" as const,
  },
  {
    title: "Rest helps you grow",
    description:
      "Good sleep, recovered appetite, and lower stress levels help your body absorb nutrients and make progress more consistently.",
    icon: "moon" as const,
  },
];

const routineSteps = [
  {
    title: "Set a reliable eating rhythm",
    text: "Aim for regular meals and snacks that are easy to repeat so your body can build momentum without the constant effort of starting over.",
  },
  {
    title: "Add strength-focused activity",
    text: "Use structured movement that supports muscular development and helps you feel stronger, not just heavier.",
  },
  {
    title: "Track trends, not spikes",
    text: "Follow weekly patterns in energy, appetite, and body changes so you can adjust with calm rather than stress.",
  },
  {
    title: "Keep flexibility in the plan",
    text: "Weight gain is sustainable when your routine supports your life, not when it creates pressure or exhaustion.",
  },
];

const supportChecklist = [
  "Choose nutrient-dense meals and snacks that help you build energy gradually and consistently.",
  "Pair strength work with recovery so your body can adapt and maintain good overall health.",
  "Protect sleep and stress balance to support appetite, digestion, and training capacity.",
  "Measure progress by your overall trend, mood, and strength—not by a single day’s scale number.",
];

export function GainWeightMindfullyPage() {
  return (
    <WellnessGoalPage
      eyebrow="Gentle growth"
      title="Gain weight mindfully"
      intro="Track your progress and plan nourishing habits that support your personal goals and preferences."
      imageUrl="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80"
      imageAlt="Healthy meal and wellness routine supporting mindful weight gain"
      floatingLabel="12-week rhythm"
      floatingValue="Steady strength and energy"
      focusStats={focusStats}
      whyTitle="Healthy growth comes from energy, recovery, and "
      whyHighlight="consistency."
      logicCards={logicCards}
      rhythmTitle="Nourish well, move well, and let the process unfold naturally."
      routineSteps={routineSteps}
      supportTitle="Supportive habits, not extremes."
      supportCopy="Weight gain works best when it fits your life, supports your energy, and feels sustainable. Focus on nourishing choices and recovery that help you feel strong, steady, and well-supported."
      supportChecklist={supportChecklist}
      ctaTitle="Build a stronger, more confident foundation for your goals."
      ctaButtonLabel="Create my plan"
    />
  );
}
