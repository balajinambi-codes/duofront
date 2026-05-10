import { apiFetch } from "./api";

export async function getDashboardData(
  userId: string
) {
  // PATHS
  const paths = await apiFetch(
    "/api/paths"
  );

  // PROGRESS
  const progress =
    await apiFetch(
      `/api/progress/${userId}`
    );

  const completedLessons =
    progress
      .filter(
        (item: any) =>
          item.completed
      )
      .map(
        (item: any) =>
          item.lessonId
      );

  // FOUNDATION
  const foundationPath =
    paths.find(
      (path: any) =>
        path.stackKey ===
        "frontend-foundations"
    );

  const lessons =
    foundationPath?.lessons || [];

  const completedCount =
    lessons.filter((lesson: any) =>
      completedLessons.includes(
        lesson.id
      )
    ).length;

  // NEXT LESSON
  const nextLesson =
    lessons.find(
      (lesson: any) =>
        !completedLessons.includes(
          lesson.id
        )
    );

  // PERCENTAGE
  const percentage =
    lessons.length > 0
      ? Math.round(
          (completedCount /
            lessons.length) *
            100
        )
      : 0;

  return {
    completedCount,
    totalLessons:
      lessons.length,
    percentage,
    nextLesson,
  };
}