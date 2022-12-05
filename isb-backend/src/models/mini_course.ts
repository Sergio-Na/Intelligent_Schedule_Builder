//TODO: Properly construct MiniCourse object as intended

interface MiniCourse {
    id: string;
    course_title: string;
    credits: number;
    faculty: string;
    overview: string;
    terms: string[];
    instructors: string[];
    prerequisites: string[];
    corequisites: string[];

};

export default MiniCourse;
