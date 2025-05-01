//@ts-ignore
import teacher_1 from "../assets/teachers/teacher_1.png";
//@ts-ignore
import teacher_2 from "../assets/teachers/teacher_2.png";
//@ts-ignore
import teacher_3 from "../assets/teachers/teacher_3.png";
//@ts-ignore
import teacher_4 from "../assets/teachers/teacher_4.png";
//@ts-ignore
import student_1 from "../assets/students/student_1.png";
//@ts-ignore
import student_2 from "../assets/students/student_2.png";
//@ts-ignore
import student_3 from "../assets/students/student_3.png";
//@ts-ignore
import student_4 from "../assets/students/student_4.png";
export type loginDataType = {
  user_name: string;
  password: string;
};

export type loginResponseType = {
  status?: string;
  result?: loginResultType;
  message: string;
  errors?: loginErrorsType;
};

interface loginResultType {
  data: userType;
}

export interface userType {
  id: number;
  name: string;
  user_name: string;
  gender?: string;
  is_active: boolean;
  image: string;
  token: string;
  dialing_code?: string;
  phone?: string;
  email?: string;
  phone_verified_at?: string;
  has_school?: string;
  guard?: string;
  school?: { id: number; title: String; image: string } | null;
  school_logo?: string;
}

interface loginErrorsType {
  user_name?: Array<string>;
}

export enum userRoles {
  MANAGER = "manager",
  TEACHER = "teacher",
  STUDENT = "student",
}

export type behaviorType = {
  id: number;
  title: string;
  points: number;
};

export type notesUserType = {
  id: number;
  name: string;
  user_name: string;
  national_id: string;
  row: classOrRowType;
  class: classOrRowType;
  is_active: number;
  points: number;
  total_points: number;
  good_behavior_count: number;
  bad_behavior_count: number;
};

export interface classOrRowType {
  id: number;
  title: string;
}

export type filterDataType = {
  search: string;
  row: number;
  class: number;
};

export type topStudentType = {
  id: number;
  name: string;
  row: string;
  class: string;
  grade: string;
  points: number;
};

export type userNoteType = {
  behavior: behaviorType;
  points: number;
  note: string;
  created_at: string;
};

export const roleImages: {
  [key: string]: string[];
} = {
  manager: [],
  teacher: [teacher_1, teacher_2, teacher_3, teacher_4],
  student: [student_1, student_2, student_3, student_4],
};

export type prizeType = {
  id: number;
  price: number;
  order: number;
  min_stock: number;
  web_image: string;
  title: string;
  stock: number;
};

export type orderType = {
  id: number;
  prize_id: number;
  prize: prizeType;
  status: string;
  price: number;
  created_at: string;
};

export const orderStatus: {
  [key: string]: string;
} = {
  pending: "تحت الإجراء",
  canceled: "تم الإلغاء",
  compeletd: "تم الإستلام",
};

export type studentReportType = {
  totalPointsEarned: string;
  totalPointsSpent: number;
  totalActualPoints: string;
  totalPrizesRedeemed: number;
  totalDeductedPoints: string;
};

export type studentNoteType = {
  id: number;
  behavior: behaviorType;
  points: number;
  note: string;
  user: {
    id: number;
    name: string;
    image: string;
  };
  created_at: string;
};

export const userRoutes: {
  [key: string]: string[];
} = {
  manager: [
    "/analytics",
    "/schools",
    "/teachers",
    "/students",
    "/prizes",
    "/orders",
    "/prizes/add",
    "/subscription",
    "/invoice",
    "/invoice/:id",
    "/setting",
    "/prizes/edit/:id",
    "/addaction",
    "/support",
    "/behaviors",
    "/settings/profilesettings",
    "/settings/pointssettings",
    "/schools/show",
    "/teachers/edit/:id",
    "/teachers/add",
    "/teachers/upload",
    "/students/edit/:id",
    "/students/upload",
    "/students/add",
    "/students/profile/:id",
    "/addaction",
    "/support/add",
    "/support/edit/:id",
    "/behaviors/edit/:id",
    "/packages",
  ],
  student: ["/student/home", "/student/prizes", "/student/orders", "/profile"],
  teacher: ["/notes", "/reports", "/first-students", "/profile", "/notes/:id"],
};

export const rolesDefaultRoutes: { [key: string]: string } = {
  manager: "/analytics",
  student: "/student/home",
  teacher: "/notes",
};

export type createManagerType = {
  user_name: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  dialing_code: string;
};

export type packageType = {
  id: number;
  order: number;
  title: string;
  description: string;
  short_description: string;
  price: string;
  start_at: string;
  end_at: string;
  teachers: number;
  students: number;
  prizes_count: number;
  color: string;
  feature_1: string;
  feature_2: string;
  feature_3: string;
  feature_4: string;
};
