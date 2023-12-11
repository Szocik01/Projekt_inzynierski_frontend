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

export type QuestionPreviewData = {
    id: string;
    text: string;
    user_id: string;
    type_id: string;
    quiz_id: string;
    link_image: string;
};

export type SelectableQuestionType = {
    quizId?: string;
    id:string;
    text:string;
    linkImage:string;
    file: File | null;
};

export type SelectableAnswerType = {
    id:string;
    text?:string;
    linkImage?:string;
    file: File | null;
    answerType:boolean;
};

export type AddAnswersViewProps = {
    token:string;
    userId:string;
    submitRequestFunction: SendRequestFunction;
    quizId:string;
    typeId:string;
}

export type EditAnswersViewProps = AddAnswersViewProps & {
    questionId:string;
}

export type PlayQuizQuestionData<T> = {
    id:string;
    text:string;
    link_image:string;
    quiz_id:string;
    answers:T[];
};

export type PlayQuizAnswerData = {
    id:string;
    text:string;
    link_image:string;
    answer_type:boolean;
    question_id:string;
};