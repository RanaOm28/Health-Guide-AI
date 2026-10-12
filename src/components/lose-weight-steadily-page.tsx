import { WellnessGoalPage } from "@/components/wellness-goal-page";

const focusStats = [
  { value: "4", label: "supportive pillars" },
  { value: "1-2 lb", label: "weekly pace often sustainable" },
  { value: "90%", label: "focus on consistency over perfection" },
];

const logicCards = [
  {
    title: "Movement that fits your life",
    description:
      "Gentle activity, strength work, and walks support energy expenditure without making the routine feel restrictive or exhausting.",
    icon: "activity" as const,
  },
  {
    title: "Meals that actually satisfy",
    description:
      "Balanced plates, regular meals, and mindful portions help control hunger while supporting long-term adherence and recovery.",
    icon: "leaf" as const,
  },
  {
    title: "Sleep and stress support progress",
    description:
      "Sleep quality and daily stress levels influence appetite, recovery, and consistency—so they matter just as much as exercise.",
    icon: "moon" as const,
  },
];

const routineSteps = [
  {
    title: "Choose a daily rhythm",
    text: "Start with a realistic movement goal and a consistent meal schedule that feels easy to repeat.",
  },
  {
    title: "Build in recovery",
    text: "Give your body time to rest, recover, and adapt—quality sleep is part of the plan, not an afterthought.",
  },
  {
    title: "Track trends, not perfection",
    text: "Look for weekly patterns in energy, hunger, and weight rather than judging each single day in isolation.",
  },
  {
    title: "Stay flexible",
    text: "Adjust the plan as needed, but keep your anchors in place: movement, nutrition, rest, and consistency.",
  },
];

const supportChecklist = [
  "Aim for steady movement instead of intense, exhausting workouts that are hard to sustain.",
  "Prefer filling meals with protein, fiber, and a balance of carbs and healthy fats.",
  "Protect sleep and stress management so your routine works with your body, not against it.",
  "Celebrate progress patterns over time rather than chasing a perfect number on the scale.",
];

export function LoseWeightSteadilyPage() {
  return (
    <WellnessGoalPage
      eyebrow="Sustainable progress"
      title="Lose weight steadily"
      intro="Build supportive routines around movement, meals, sleep, and consistency—at a pace that feels sustainable."
      imageUrl="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
      imageAlt="Woman walking outdoors with a steady wellness routine"
      floatingLabel="12-week pace"
      floatingValue="Slow, steady, sustainable"
      focusStats={focusStats}
      whyTitle="Healthy weight loss grows from "
      whyHighlight="repeatable habits."
      logicCards={logicCards}
      rhythmTitle="Small wins add up when your routine is realistic."
      routineSteps={routineSteps}
      supportTitle="Supportive habits, not extremes."
      supportCopy="Weight change is most sustainable when your routine supports your energy, stress levels, and sleep. Instead of chasing perfection, aim for consistency and recovery."
      supportChecklist={supportChecklist}
      ctaTitle="Build a calmer, more steady path toward your goal."
      ctaButtonLabel="Create your plan"
    />
  );
}
