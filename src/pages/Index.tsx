import { useState } from "react";
import Hero from "@/components/Hero";
import RoleSelection from "@/components/RoleSelection";
import Dashboard from "@/components/Dashboard";
import LessonInterface from "@/components/LessonInterface";

type AppState = "landing" | "dashboard" | "lesson";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [currentLesson, setCurrentLesson] = useState<string>("");

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentState("dashboard");
  };

  const handleStartLesson = (lessonId: string) => {
    setCurrentLesson(lessonId);
    setCurrentState("lesson");
  };

  const handleBackToDashboard = () => {
    setCurrentState("dashboard");
    setCurrentLesson("");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
    setSelectedRole("");
    setCurrentLesson("");
  };

  if (currentState === "lesson") {
    return (
      <LessonInterface 
        lessonId={currentLesson}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentState === "dashboard") {
    return (
      <Dashboard 
        role={selectedRole}
        onStartLesson={handleStartLesson}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <RoleSelection onRoleSelect={handleRoleSelect} />
    </div>
  );
};

export default Index;
