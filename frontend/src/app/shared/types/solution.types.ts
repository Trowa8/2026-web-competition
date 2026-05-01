export type Submission = {
    submissionId: number;
    teamId: number;
    taskId: number;
    githubUrl: string;
    demoUrl: string | null;
    videoUrl: string;
    description: string | null;
    createdAt: string;
};