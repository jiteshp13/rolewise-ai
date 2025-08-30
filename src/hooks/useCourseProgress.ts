import { useState, useEffect } from 'react';
import { CourseProgress, defaultProgress, achievements } from '@/data/marketingCourse';

const STORAGE_KEY = 'ai-marketing-course-progress';

export const useCourseProgress = () => {
  const [progress, setProgress] = useState<CourseProgress>(defaultProgress);

  // Load progress from localStorage on init
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress({ ...defaultProgress, ...parsed });
      } catch (error) {
        console.error('Failed to parse saved progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeLesson = (lessonId: string) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        completedLessons: [...new Set([...prev.completedLessons, lessonId])],
        totalPoints: prev.totalPoints + 100,
        lastActivityDate: new Date().toISOString()
      };

      // Check for new achievements
      const newAchievements = checkAchievements(newProgress);
      if (newAchievements.length > 0) {
        newProgress.achievements = [...new Set([...prev.achievements, ...newAchievements])];
        newProgress.totalPoints += newAchievements.reduce((total, id) => {
          const achievement = achievements.find(a => a.id === id);
          return total + (achievement?.points || 0);
        }, 0);
      }

      return newProgress;
    });
  };

  const updateLessonProgress = (lessonId: string, stepIndex: number) => {
    setProgress(prev => ({
      ...prev,
      lessonProgress: {
        ...prev.lessonProgress,
        [lessonId]: stepIndex
      },
      currentLesson: lessonId,
      lastActivityDate: new Date().toISOString()
    }));
  };

  const updateStreak = () => {
    setProgress(prev => {
      const today = new Date().toDateString();
      const lastActivity = new Date(prev.lastActivityDate).toDateString();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      
      let newStreak = prev.streak;
      
      if (lastActivity === today) {
        // Already updated today, no change
        return prev;
      } else if (lastActivity === yesterday) {
        // Consecutive day, increment streak
        newStreak = prev.streak + 1;
      } else {
        // Streak broken, reset to 1
        newStreak = 1;
      }

      return {
        ...prev,
        streak: newStreak,
        lastActivityDate: new Date().toISOString()
      };
    });
  };

  const checkAchievements = (currentProgress: CourseProgress): string[] => {
    const newAchievements: string[] = [];

    // First lesson achievement
    if (currentProgress.completedLessons.length >= 1 && !currentProgress.achievements.includes('first-lesson')) {
      newAchievements.push('first-lesson');
    }

    // Specific lesson achievements
    const lessonAchievements = [
      { lessonId: 'ai-content-creation', achievementId: 'content-creator' },
      { lessonId: 'ai-ad-copy-mastery', achievementId: 'ad-expert' },
      { lessonId: 'email-marketing-ai', achievementId: 'email-pro' },
      { lessonId: 'marketing-analytics-ai', achievementId: 'analytics-master' }
    ];

    lessonAchievements.forEach(({ lessonId, achievementId }) => {
      if (currentProgress.completedLessons.includes(lessonId) && !currentProgress.achievements.includes(achievementId)) {
        newAchievements.push(achievementId);
      }
    });

    // Streak achievement
    if (currentProgress.streak >= 7 && !currentProgress.achievements.includes('streak-7')) {
      newAchievements.push('streak-7');
    }

    return newAchievements;
  };

  const getProgressPercentage = () => {
    const totalLessons = 5; // Total lessons in marketing course
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    progress,
    completeLesson,
    updateLessonProgress,
    updateStreak,
    getProgressPercentage,
    resetProgress
  };
};