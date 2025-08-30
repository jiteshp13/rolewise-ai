import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target, 
  PlayCircle, 
  CheckCircle2, 
  Star,
  ArrowRight,
  Zap,
  Brain
} from "lucide-react";

interface DashboardProps {
  role: string;
  onStartLesson: (lessonId: string) => void;
}

const Dashboard = ({ role, onStartLesson }: DashboardProps) => {
  // Mock data - in real app this would come from API
  const userData = {
    name: "Alex",
    role: "Marketing Professional",
    totalLessons: 12,
    completedLessons: 4,
    currentStreak: 5,
    totalPoints: 1250,
    nextBadge: "AI Content Master",
    pointsToNextBadge: 250
  };

  const lessons = [
    {
      id: "marketing-ad-copy",
      title: "AI-Powered Ad Copy Creation",
      description: "Master the art of creating compelling advertisements with AI assistance",
      duration: "8 mins",
      difficulty: "Beginner",
      completed: false,
      locked: false,
      type: "hands-on"
    },
    {
      id: "marketing-content-strategy",
      title: "Content Strategy with AI Insights",
      description: "Develop data-driven content strategies using AI analytics",
      duration: "12 mins",
      difficulty: "Intermediate",
      completed: false,
      locked: false,
      type: "project"
    },
    {
      id: "marketing-campaign-optimization",
      title: "AI Campaign Optimization",
      description: "Learn to optimize campaigns using AI-powered A/B testing",
      duration: "15 mins",
      difficulty: "Advanced",
      completed: false,
      locked: true,
      type: "hands-on"
    }
  ];

  const achievements = [
    { name: "First Steps", description: "Completed first lesson", unlocked: true },
    { name: "Consistent Learner", description: "5-day learning streak", unlocked: true },
    { name: "AI Practitioner", description: "Applied AI in 3 projects", unlocked: false },
    { name: "Content Master", description: "Mastered all content lessons", unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your AI learning journey as a {userData.role}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {userData.completedLessons}/{userData.totalLessons}
                </div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{userData.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{userData.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round((userData.completedLessons / userData.totalLessons) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Continue Learning</h2>
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            lesson.completed 
                              ? 'bg-success' 
                              : lesson.locked 
                              ? 'bg-muted' 
                              : 'bg-gradient-primary'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            ) : lesson.locked ? (
                              <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {lesson.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {lesson.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button 
                        variant={lesson.completed ? "outline" : "default"}
                        size="sm"
                        disabled={lesson.locked}
                        onClick={() => onStartLesson(lesson.id)}
                      >
                        {lesson.completed ? "Review" : lesson.locked ? "Locked" : "Start"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Next Badge Progress */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Next Achievement</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{userData.nextBadge}</h3>
                      <p className="text-sm text-muted-foreground">
                        {userData.pointsToNextBadge} points to go
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{userData.totalPoints + userData.pointsToNextBadge} pts</Badge>
                </div>
                <Progress 
                  value={(userData.totalPoints / (userData.totalPoints + userData.pointsToNextBadge)) * 100} 
                  className="h-2"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Goal */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">This Week's Goal</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Complete 3 lessons</span>
                  <span className="text-sm font-medium text-foreground">2/3</span>
                </div>
                <Progress value={67} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Great progress! One more lesson to reach your goal.
                </p>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? 'bg-success' : 'bg-muted'
                    }`}>
                      {achievement.unlocked ? (
                        <Star className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {achievement.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Achievements
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Set Learning Goals
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse All Paths
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Leaderboard
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;