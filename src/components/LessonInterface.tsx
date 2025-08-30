import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Sparkles, Clock } from "lucide-react";

interface LessonInterfaceProps {
  lessonId: string;
  onBack: () => void;
}

const LessonInterface = ({ lessonId, onBack }: LessonInterfaceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [aiCoachFeedback, setAiCoachFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  // Mock lesson data - in real app this would come from API
  const lesson = {
    id: "marketing-ad-copy",
    title: "AI-Powered Ad Copy Creation",
    description: "Learn to create compelling ad copy using AI tools",
    estimatedTime: "8 mins",
    progress: 33,
    steps: [
      {
        type: "learn",
        title: "Understanding AI Ad Copy Principles",
        content: "AI can help you create more effective ad copy by analyzing successful patterns and suggesting improvements. Key principles include clarity, emotional appeal, and strong calls-to-action.",
        tips: ["Keep your target audience in mind", "Test multiple variations", "Focus on benefits over features"]
      },
      {
        type: "practice",
        title: "Create Your First AI Ad Copy",
        content: "Now it's your turn! Create an ad copy for a fitness app targeting busy professionals. Use the AI coach to guide you.",
        prompt: "Write a Facebook ad copy for a fitness app called 'FitLife' targeting busy professionals aged 25-40. Focus on convenience and quick workouts.",
        expectedElements: ["Target audience mention", "App name", "Key benefit", "Call to action"]
      },
      {
        type: "feedback",
        title: "AI Coach Review",
        content: "Let's review your ad copy with our AI coach and see how it can be improved."
      }
    ]
  };

  const currentStepData = lesson.steps[currentStep];

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitForReview = () => {
    // Simulate AI feedback
    setAiCoachFeedback(`Great start! Your ad copy includes the app name and targets busy professionals. Here are some suggestions to make it even better:

✅ **What's working well:**
- Clear target audience (busy professionals)
- Mentions the app name "FitLife"
- Addresses a pain point (time constraints)

🚀 **Suggestions for improvement:**
1. Add a specific time benefit (e.g., "5-minute workouts")
2. Include a stronger emotional hook
3. Make the call-to-action more urgent

**Improved version:**
"Busy professional? Get fit in just 5 minutes with FitLife! Our AI-powered workouts fit perfectly into your hectic schedule. Join 50k+ professionals who've transformed their health without sacrificing career goals. Download FitLife now - your future self will thank you!"

This version is more specific, emotionally engaging, and includes social proof.`);
    setShowFeedback(true);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" />
            {lesson.estimatedTime}
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {lesson.steps.length}
            </span>
          </div>
          <Progress value={(currentStep + 1) / lesson.steps.length * 100} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    {currentStepData.type === 'learn' && <Lightbulb className="w-4 h-4 text-white" />}
                    {currentStepData.type === 'practice' && <Sparkles className="w-4 h-4 text-white" />}
                    {currentStepData.type === 'feedback' && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{currentStepData.title}</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {currentStepData.content}
                </p>

                {currentStepData.type === 'learn' && currentStepData.tips && (
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Key Tips:</h3>
                    <ul className="space-y-1">
                      {currentStepData.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentStepData.type === 'practice' && (
                  <div className="space-y-4">
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-2">Your Task:</h3>
                      <p className="text-sm text-muted-foreground">{currentStepData.prompt}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Ad Copy:
                      </label>
                      <Textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Write your ad copy here..."
                        className="min-h-32"
                      />
                    </div>

                    <Button 
                      onClick={handleSubmitForReview} 
                      variant="hero"
                      disabled={!userInput.trim()}
                      className="w-full"
                    >
                      Get AI Coach Feedback
                    </Button>
                  </div>
                )}

                {currentStepData.type === 'feedback' && showFeedback && (
                  <div className="bg-gradient-secondary border border-border rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">AI Coach Feedback</h3>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-line text-muted-foreground">
                        {aiCoachFeedback}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button 
                    variant="default"
                    onClick={handleNext}
                    disabled={currentStep === lesson.steps.length - 1}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Coach Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Coach</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-muted-foreground">
                    I'm here to guide you through this lesson. Feel free to experiment with different approaches!
                  </p>
                </div>
                
                {currentStepData.type === 'practice' && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                    <p className="text-primary text-xs font-medium mb-1">Pro Tip:</p>
                    <p className="text-muted-foreground text-xs">
                      Start with your target audience, then mention the key benefit that solves their problem.
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-3">Lesson Progress</h3>
              <div className="space-y-2">
                {lesson.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      index < currentStep 
                        ? 'bg-success text-white' 
                        : index === currentStep 
                        ? 'bg-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index < currentStep ? <CheckCircle className="w-3 h-3" /> : index + 1}
                    </div>
                    <span className={`text-sm ${
                      index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInterface;