//TODO: Properly construct MiniCourse object as intended

class MiniCourse {
    id: string;
    course_title: string;
    credits: number;
    faculty: string;
    overview: string;
    terms: string[];
    instructors: string[];
    prerequisites: string[];
    corequisites: string[];
    

    

    constructor(id: string,course_title: string, credits: number,faculty: string,overview: string,
        terms: string[],instructors: string[],prerequisites: string[],corequisites: string[]) {

        this.id = id;
        this.course_title = course_title,
        this.credits = credits
        this.faculty= faculty,
        this.overview = overview,
        this.terms = terms,
        this.instructors = instructors,
        this.prerequisites = prerequisites,
        this.corequisites= corequisites
    };
};

export default MiniCourse;
