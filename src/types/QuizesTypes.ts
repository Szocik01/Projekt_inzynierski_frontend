import { SendRequestFunction } from "./UtilityTypes";

export type QuizPreviewData = {
    id: string;
    name: string;
    user_id: string;
    description: string;
    image_path: string;
    link_image: string;
    questions: number;
};

export type SelectableQuestionType = {
    id:string;
    userId:string;
    quizId:string;
    text:string;
    linkImage:string;
    file: File | null;
    questionType?:{
        id:string;
        name:string;
    };
};

export type SelectableAnswerType = {
    id:string;
    userId?:string;
    questionId?:string;
    text?:string;
    linkImage?:string;
    file: File | null;
    answerType:boolean;
};

export type AnswersViewProps = {
    token:string;
    userId:string;
    submitRequestFunction: SendRequestFunction;
    quizId:string;
    typeId:string;
}