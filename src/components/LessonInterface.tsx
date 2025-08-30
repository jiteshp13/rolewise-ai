import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Sparkles, Clock, Trophy, Brain } from "lucide-react";
import { marketingCourse, type Lesson } from "@/data/marketingCourse";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { useToast } from "@/hooks/use-toast";

interface LessonInterfaceProps {
  lessonId: string;
  onBack: () => void;
}

const LessonInterface = ({ lessonId, onBack }: LessonInterfaceProps) => {
  const { progress, updateLessonProgress, completeLesson, updateStreak } = useCourseProgress();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [aiCoachFeedback, setAiCoachFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Find the lesson in the course data
  const lesson = marketingCourse.find(l => l.id === lessonId);
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">Lesson Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested lesson could not be found.</p>
          <Button onClick={onBack}>Return to Dashboard</Button>
        </Card>
      </div>
    );
  }

  // Initialize current step from saved progress
  useEffect(() => {
    const savedStep = progress.lessonProgress[lessonId] || 0;
    setCurrentStep(savedStep);
  }, [lessonId, progress.lessonProgress]);

  // Mock lesson data - in real app this would come from API
  const currentStepData = lesson.steps[currentStep];

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateLessonProgress(lessonId, nextStep);
      updateStreak();
    } else {
      // Lesson completed
      if (!progress.completedLessons.includes(lessonId)) {
        completeLesson(lessonId);
        toast({
          title: "🎉 Lesson Completed!",
          description: `You've finished "${lesson.title}" and earned 100 points!`,
        });
      }
      onBack();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateLessonProgress(lessonId, prevStep);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const questions = currentStepData.quizQuestions || [];
    const correctAnswers = questions.filter((q, index) => quizAnswers[index] === q.correctAnswer);
    const score = Math.round((correctAnswers.length / questions.length) * 100);
    
    toast({
      title: `Quiz Results: ${score}%`,
      description: `You got ${correctAnswers.length} out of ${questions.length} questions correct!`,
    });
  };

  const handleSubmitForReview = () => {
    // Generate AI feedback based on lesson type
    const feedbackTemplates = {
      "marketing-ad-copy": `Great start! Your ad copy includes key elements. Here are some suggestions to make it even better:

✅ **What's working well:**
- Clear target audience identification
- Addresses a genuine pain point
- Includes a call-to-action

🚀 **Suggestions for improvement:**
1. Add a specific time benefit (e.g., "5-minute workouts")
2. Include a stronger emotional hook
3. Make the call-to-action more urgent
4. Add social proof or statistics

**Improved version:**
"Busy professional? Get fit in just 5 minutes with FitLife! Our AI-powered workouts fit perfectly into your hectic schedule. Join 50k+ professionals who've transformed their health without sacrificing career goals. Download FitLife now - your future self will thank you!"

This version is more specific, emotionally engaging, and includes social proof.`,

      "hr-job-description": `Excellent foundation! Your job description captures the key elements. Here's how to make it even more compelling:

✅ **What's working well:**
- Clear role title and responsibilities
- Mentions required skills
- Shows company personality

🚀 **Suggestions for improvement:**
1. Use more inclusive language (avoid gender-coded words)
2. Highlight growth opportunities more prominently
3. Add specific examples of projects they'll work on
4. Include company values and culture

**Enhanced version:**
"Mid-Level Software Developer - Join Our Fintech Revolution! 🚀

Ready to shape the future of finance? We're seeking a passionate developer to build cutting-edge solutions that help millions manage their money better.

What you'll do:
• Develop secure, scalable financial applications
• Collaborate with cross-functional teams on user-focused features
• Mentor junior developers and shape our tech culture

This role offers tremendous growth opportunities in a fast-paced, learning-focused environment."`,

      "support-response": `Well done! Your response shows empathy and addresses the issue. Here's how to make it even more effective:

✅ **What's working well:**
- Acknowledges customer frustration
- Takes responsibility appropriately
- Offers a clear solution

🚀 **Suggestions for improvement:**
1. Start with stronger empathy acknowledgment
2. Explain the situation more clearly
3. Provide multiple solution options
4. Include proactive follow-up

**Improved response:**
"I completely understand your frustration about this unexpected charge - that would be concerning for anyone! I sincerely apologize for the confusion.

Let me explain what happened and fix this immediately:
[Explanation of billing situation]

Here's what I can do for you right away:
1. [Immediate solution]
2. [Alternative option]

I'll also follow up in 24 hours to ensure everything is resolved to your satisfaction. Is there anything else I can help clarify?"`,

      "ops-automation": `Great workflow design! You've identified key automation points. Here's how to optimize it further:

✅ **What's working well:**
- Clear step-by-step process
- Identifies key automation points
- Considers error handling

🚀 **Suggestions for improvement:**
1. Add specific validation rules
2. Include performance metrics tracking
3. Define escalation procedures
4. Consider integration with existing systems

**Optimized workflow:**
"1. AI Document Processing: Extract data with 95% accuracy threshold
2. Smart Validation: Cross-check against vendor database and historical patterns
3. Intelligent Routing: Auto-approve under $500, route higher amounts based on department rules
4. Integration Hub: Update accounting system, notify stakeholders, track processing time
5. Continuous Learning: Monitor accuracy, update rules based on patterns"

This workflow includes specific thresholds, performance tracking, and continuous improvement mechanisms.`
    };

    const feedback = feedbackTemplates[lessonId as keyof typeof feedbackTemplates] || feedbackTemplates["marketing-ad-copy"];
    setAiCoachFeedback(feedback);
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

                {currentStepData.type === 'quiz' && (
                  <div className="space-y-6">
                    {currentStepData.quizQuestions?.map((question, qIndex) => (
                      <div key={qIndex} className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-3">
                          Question {qIndex + 1}: {question.question}
                        </h4>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <label key={oIndex} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name={`question-${qIndex}`}
                                value={oIndex}
                                checked={quizAnswers[qIndex] === oIndex}
                                onChange={() => setQuizAnswers(prev => ({ ...prev, [qIndex]: oIndex }))}
                                className="w-4 h-4 text-primary"
                              />
                              <span className="text-sm text-muted-foreground">{option}</span>
                            </label>
                          ))}
                        </div>
                        {quizSubmitted && (
                          <div className={`mt-3 p-3 rounded-lg text-sm ${
                            quizAnswers[qIndex] === question.correctAnswer 
                              ? 'bg-success/20 text-success border border-success/20' 
                              : 'bg-destructive/20 text-destructive border border-destructive/20'
                          }`}>
                            {quizAnswers[qIndex] === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                            <p className="mt-1 opacity-90">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {!quizSubmitted && (
                      <Button 
                        onClick={handleQuizSubmit}
                        variant="hero"
                        disabled={Object.keys(quizAnswers).length !== (currentStepData.quizQuestions?.length || 0)}
                        className="w-full"
                      >
                        Submit Quiz
                      </Button>
                    )}
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
                        Your Response:
                      </label>
                      <Textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Write your response here..."
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
                    disabled={
                      currentStep === lesson.steps.length - 1 ? false :
                      currentStepData.type === 'quiz' ? !quizSubmitted :
                      currentStepData.type === 'practice' ? !showFeedback :
                      false
                    }
                  >
                    {currentStep === lesson.steps.length - 1 ? 'Complete Lesson' : 'Next'}
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
                    {currentStepData.type === 'learn' && "Take your time to understand these concepts. They'll be essential for the practical exercises ahead."}
                    {currentStepData.type === 'quiz' && "Test your knowledge! Don't worry if you don't get everything right - learning is a process."}
                    {currentStepData.type === 'practice' && "Apply what you've learned! Remember, practice makes perfect."}
                    {currentStepData.type === 'feedback' && "Review the feedback carefully - these insights will help you improve your skills."}
                  </p>
                </div>
                
                {currentStepData.type === 'practice' && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                    <p className="text-primary text-xs font-medium mb-1">Pro Tip:</p>
                    <p className="text-muted-foreground text-xs">
                      Think about your target audience first, then craft your message to address their specific needs and pain points.
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

            {/* Course Progress */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">Course Progress</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Marketing Course</span>
                  <span className="font-medium text-foreground">{progress.completedLessons.length}/5</span>
                </div>
                <Progress value={(progress.completedLessons.length / 5) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {progress.completedLessons.length === 0 && "Start your AI marketing journey!"}
                  {progress.completedLessons.length > 0 && progress.completedLessons.length < 5 && "Keep going! You're making great progress."}
                  {progress.completedLessons.length === 5 && "🎉 Course completed! You're an AI marketing expert!"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInterface;