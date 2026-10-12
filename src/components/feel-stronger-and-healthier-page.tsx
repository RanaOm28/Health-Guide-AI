import { WellnessGoalPage } from "@/components/wellness-goal-page";

const focusStats = [
  { value: "4", label: "core wellbeing habits" },
  { value: "3x/week", label: "movement rhythm for sustainable momentum" },
  { value: "100%", label: "focus on feeling strong, energized, and supported" },
];

const logicCards = [
  {
    title: "Move for energy",
    description:
      "Regular activity builds strength, stamina, and confidence while making everyday wellbeing feel easier to maintain.",
    icon: "activity" as const,
  },
  {
    title: "Nourish your momentum",
    description:
      "Balanced meals, hydration, and consistency support energy, focus, and recovery across the week.",
    icon: "sparkle" as const,
  },
  {
    title: "Protect your recovery",
    description:
      "Sleep, stress management, and routines that respect your pace help your body feel stronger in the long run.",
    icon: "shield" as const,
  },
];

const routineSteps = [
  {
    title: "Choose a repeatable pattern",
    text: "Create a simple rhythm for movement, food, and rest that you can sustain through busy weeks and changing schedules.",
  },
  {
    title: "Train with purpose",
    text: "Focus on strength, mobility, and consistency so you build lasting energy and resilience instead of short-term effort.",
  },
  {
    title: "Reinforce recovery",
    text: "Make sleep, hydration, and stress management part of the plan so your progress is steady and sustainable.",
  },
  {
    title: "Celebrate everyday wins",
    text: "Notice how you feel—more energetic, calmer, stronger, and more confident—and let that fuel the next step.",
  },
];

const supportChecklist = [
  "Build a realistic movement routine that supports energy and strength without burning you out.",
  "Choose supportive meals and hydration habits that help you feel balanced and ready for each day.",
  "Maintain recovery habits like sleep and mindful stress management to sustain long-term wellbeing.",
  "Let progress be measured by how you feel, move, and recover—not just by a number on a scale.",
];

export function FeelStrongerAndHealthierPage() {
  return (
    <WellnessGoalPage
      eyebrow="Whole-body wellbeing"
      title="Feel stronger and healthier"
      intro="Focus on everyday wellbeing, celebrate small wins, and shape goals that are about more than a number."
      imageUrl="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80"
      imageAlt="Person feeling strong and healthy through exercise and recovery"
      floatingLabel="Wellbeing rhythm"
      floatingValue="Energy, strength, and resilience"
      focusStats={focusStats}
      whyTitle="Strong health grows from everyday habits that feel good to "
      whyHighlight="maintain."
      logicCards={logicCards}
      rhythmTitle="A strong routine is built on consistency, not pressure."
      routineSteps={routineSteps}
      supportTitle="Supportive habits, not extremes."
      supportCopy="The best wellness routines are the ones you can maintain with energy and ease. Focus on movement, nourishment, recovery, and small wins that compound over time."
      supportChecklist={supportChecklist}
      ctaTitle="Build a routine that helps you feel better every day."
      ctaButtonLabel="Start feeling stronger"
    />
  );
}
