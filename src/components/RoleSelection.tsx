import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Megaphone, Settings, HeadphonesIcon } from "lucide-react";

const roles = [
  {
    id: "marketing",
    title: "Marketing",
    icon: Megaphone,
    description: "Master AI for campaigns, content creation, and customer insights",
    lessons: 12,
    duration: "2-3 hours",
    color: "bg-gradient-primary",
    skills: ["Ad Copy", "Content Strategy", "A/B Testing", "Customer Insights"]
  },
  {
    id: "operations",
    title: "Operations",
    icon: Settings,
    description: "Automate workflows, optimize processes, and enhance productivity",
    lessons: 10,
    duration: "2 hours",
    color: "bg-gradient-accent",
    skills: ["Process Automation", "Data Analysis", "Reporting", "Workflow Design"]
  },
  {
    id: "hr",
    title: "Human Resources",
    icon: Users,
    description: "Streamline recruiting, enhance employee experience, and improve communications",
    lessons: 8,
    duration: "1.5 hours",
    color: "bg-gradient-secondary",
    skills: ["Job Descriptions", "Employee FAQs", "Policy Writing", "Recruiting"]
  },
  {
    id: "support",
    title: "Customer Support",
    icon: HeadphonesIcon,
    description: "Provide better customer service with AI-powered responses and insights",
    lessons: 11,
    duration: "2 hours",
    color: "bg-gradient-primary",
    skills: ["Response Templates", "Sentiment Analysis", "Issue Resolution", "Knowledge Base"]
  }
];

interface RoleSelectionProps {
  onRoleSelect: (roleId: string) => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            Choose Your <span className="bg-gradient-primary bg-clip-text text-transparent">Learning Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get tailored AI training designed specifically for your role and daily workflows
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card key={role.id} className="p-6 hover:shadow-card transition-all duration-300 hover:scale-105 border-border/50">
                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{role.lessons} lessons</span>
                    <span>•</span>
                    <span>{role.duration}</span>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {role.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {role.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{role.skills.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  {/* Action */}
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => onRoleSelect(role.id)}
                  >
                    Start Learning
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Not sure which path is right for you? 
            <Button variant="link" className="p-0 ml-1 h-auto">
              Take our quick assessment
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoleSelection;