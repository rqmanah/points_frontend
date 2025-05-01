import { Switch } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(localStorage.getItem("i18nextLng") || "ar");

  const handleLanguageChange = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    i18n.changeLanguage(newLang);
    document.title = t("Privacy Policy");

    localStorage.setItem("lang", newLang);
  };

  return (
    <div>
      <div>
        <Switch checked={lang === "en"} onChange={handleLanguageChange} />
        {lang === "ar" ? "اللغة العربية" : "English"}
      </div>
      <div className="px-5">
        <h3 className="fw-bold mb-5 text-center">
          {lang === "ar"
            ? "*سياسة الخصوصية لموقع المدرسة*"
            : "*School Website Privacy Policy*"}
        </h3>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*مقدمة اتفاقية الاستخدام:*"
            : "*Introduction to the Terms of Use:*"}
        </h5>
        <p>
          {lang === "ar"
            ? "يرحب موقعن بوينت بكم، ويحيطكم علماً بأن استخدامكم لخدمات الموقع يخضع للشروط والأحكام الواردة أدناه. يعد استخدام أي شخص لهذه المنصة بمثابة موافقة ضمنية منه على الالتزام بجميع بنود هذه الاتفاقية. وتعتبر هذه الاتفاقية مرجعاً قانونياً لجميع التعاملات التي تتم بين المدرسة، الطلاب، والمعلمين."
            : "Point website welcomes you and informs you that your use of the site's services is subject to the terms and conditions listed below. Any person's use of this platform constitutes an implicit agreement to abide by all the terms of this agreement. This agreement is considered a legal reference for all transactions between the school, students, and teachers."}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الأولى - المقدمة والتعريفات:*"
            : "*Article 1 - Introduction and Definitions:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div>
                تشكل المقدمة السابقة جزءاً لا يتجزأ من هذه الاتفاقية. وفيما يلي
                تعريفات لبعض المصطلحات الرئيسية:
              </div>
              <div className="p-2">
                1. الموقع: يشير إلى المنصة الإلكترونية التي تجمع المدرسة مع
                الطلاب والمعلمين، وتتيح للمعلمين إعطاء الطلاب نقاطاً إيجابية أو
                سلبية.
              </div>
              <div className="p-2">
                2. الطالب: هو المستخدم الذي يتلقى التعليم من خلال المدرسة
                ويستطيع جمع وتحويل النقاط إلى هدايا من متجر المدرسة.
              </div>
              <div className="p-2">
                3. المعلم: هو المستخدم الذي يقوم بإعطاء النقاط الإيجابية أو
                السلبية للطلاب بناءً على أدائهم وسلوكهم.
              </div>
              <div className="p-2">
                4. النقاط: هي الوحدات التي يحصل عليها الطالب من المعلم، ويمكن
                تحويلها إلى نقاط للمشاركة في متجر المدرسة.
              </div>
            </div>
          ) : (
            <div>
              <div>
                The above introduction forms an integral part of this agreement.
                Below are definitions of some key terms:
              </div>
              <div className="p-2">
                1. The Site: Refers to the electronic platform that connects the
                school with students and teachers, allowing teachers to give
                students positive or negative points.
              </div>
              <div className="p-2">
                2. Student: The user who receives education through the school
                and can collect and redeem points for gifts from the school
                store.
              </div>
              <div className="p-2">
                3. Teacher: The user who gives positive or negative points to
                students based on their performance and behavior.
              </div>
              <div className="p-2">
                4. Points: The units that the student receives from the teacher,
                which can be redeemed for gifts in the school store.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الثانية - الأهلية القانونية:*"
            : "*Article 2 - Legal Capacity:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. يقر الطالب أو المعلم بأنه يتمتع بالأهلية القانونية للتعامل مع
                الموقع.
              </div>
              <div className="p-2">
                2. يتحمل المستخدم المسؤولية الكاملة عن أي انتهاك لهذه الشروط.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. The student or teacher acknowledges that they have the legal
                capacity to interact with the site.
              </div>
              <div className="p-2">
                2. The user assumes full responsibility for any violation of
                these terms.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الثالثة - طبيعة الالتزام:*"
            : "*Article 3 - Nature of Commitment:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. يلتزم الموقع بتوفير منصة تتيح للمعلمين إعطاء النقاط للطلاب،
                وللطلاب تحويل هذه النقاط إلى هدايا من متجر المدرسة بعد موافقة
                المدير.
              </div>
              <div className="p-2">
                2. تلتزم المدرسة بتوفير الهدايا المتاحة في المتجر بناءً على
                النقاط التي يجمعها الطلاب.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. The site is committed to providing a platform that allows
                teachers to give points to students, and for students to redeem
                these points for gifts from the school store after approval from
                the principal.
              </div>
              <div className="p-2">
                2. The school is committed to providing the gifts available in
                the store based on the points collected by the students.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الرابعة - شروط الاستخدام:*"
            : "*Article 4 - Terms of Use:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. يلتزم المستخدم باستخدام الموقع وفقاً للأنظمة المعمول بها في
                المدرسة والقوانين ذات الصلة.
              </div>
              <div className="p-2">
                2. يُمنع استخدام الموقع لأي أغراض غير قانونية أو تخالف الآداب
                العامة.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. The user agrees to use the site in accordance with the rules
                in force at the school and relevant laws.
              </div>
              <div className="p-2">
                2. The use of the site for any illegal purposes or those
                contrary to public morals is prohibited.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الخامسة - الحسابات والتسجيل:*"
            : "*Article 5 - Accounts and Registration:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. عند التسجيل في الموقع، يتعهد المستخدم بتقديم معلومات صحيحة
                ودقيقة.
              </div>
              <div className="p-2">
                2. المستخدم مسؤول عن الحفاظ على سرية معلومات حسابه وكلمة المرور.
              </div>
              <div className="p-2">
                3. في حال اكتشاف معلومات غير صحيحة، يحتفظ الموقع بحق إيقاف أو
                إلغاء حساب المستخدم.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. When registering on the site, the user undertakes to provide
                correct and accurate information.
              </div>
              <div className="p-2">
                2. The user is responsible for maintaining the confidentiality
                of their account information and password.
              </div>
              <div className="p-2">
                3. If incorrect information is discovered, the site reserves the
                right to suspend or cancel the user’s account.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة السادسة - الاتصالات الإلكترونية:*"
            : "*Article 6 - Electronic Communications:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. يتم التواصل بين أطراف هذه الاتفاقية عبر البريد الإلكتروني
                المسجل في الموقع.
              </div>
              <div className="p-2">
                2. جميع الإعلانات والإخطارات التي يتم إرسالها إلكترونياً تعتبر
                ملزمة قانونياً.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. Communication between the parties to this agreement will take
                place via the email registered on the site.
              </div>
              <div className="p-2">
                2. All announcements and notices sent electronically are legally
                binding.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة السابعة - التعديلات والرسوم:*"
            : "*Article 7 - Amendments and Fees:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. يحتفظ الموقع بالحق في تعديل الشروط والأحكام من وقت لآخر.
              </div>
              <div className="p-2">
                2. يتم احتساب الرسوم (إن وجدت) بالعملة المحلية المعتمدة من قبل
                المدرسة.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. The site reserves the right to modify the terms and
                conditions from time to time.
              </div>
              <div className="p-2">
                2. Fees (if any) will be calculated in the local currency
                approved by the school.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الثامنة - الدفع وخدمات الدفع:*"
            : "*Article 8 - Payment and Payment Services:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. يتم تحويل النقاط من قبل الطلاب إلى هدايا عبر النظام
                الإلكتروني للموقع.
              </div>
              <div className="p-2">
                2. يلتزم الموقع بتقديم فاتورة إلكترونية للطالب عند الموافقة على
                استلام الهدايا.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. Points are redeemed by students for gifts through the site’s
                electronic system.
              </div>
              <div className="p-2">
                2. The site is committed to providing an electronic invoice to
                the student upon approval to receive the gifts.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة التاسعة - الملكية الفكرية:*"
            : "*Article 9 - Intellectual Property:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. جميع حقوق الملكية الفكرية للموقع محفوظة، ويجب على المستخدمين
                احترام هذه الحقوق.
              </div>
            </div>
          ) : (
            <div className="p-2">
              <div>
                1. All intellectual property rights of the site are reserved,
                and users must respect these rights.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة العاشرة - مسؤولية الموقع:*"
            : "*Article 10 - Site Responsibility:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. يلتزم الموقع بإدارة عملياته بشكل منتظم ووفقاً للقوانين
                المعمول بها.
              </div>
              <div className="p-2">
                2. لا يتحمل الموقع مسؤولية أي أخطاء ناتجة عن المستخدمين أو
                الأطراف الثالثة.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. The site is committed to managing its operations regularly
                and in accordance with applicable laws.
              </div>
              <div className="p-2">
                2. The site is not responsible for any errors caused by users or
                third parties.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الحادية عشرة - تقييد الوصول أو العضوية:*"
            : "*Article 11 - Access Restriction or Membership:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div>
                يحتفظ الموقع بحق تقييد أو إلغاء عضوية المستخدم في أي وقت ودون
                إشعار مسبق.
              </div>
            </div>
          ) : (
            <div>
              <div>
                The site reserves the right to restrict or cancel the user’s
                membership at any time without prior notice.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الثانية عشرة - القانون المطبق:*"
            : "*Article 12 - Governing Law:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div>
                تحكم هذه الاتفاقية بالقوانين المعمول بها في المدرسة وتخضع
                للأنظمة ذات الصلة.
              </div>
            </div>
          ) : (
            <div>
              <div>
                This agreement is governed by the laws in force at the school
                and is subject to relevant regulations.
              </div>
            </div>
          )}
        </p>

        <h5 className="fw-bold">
          {lang === "ar"
            ? "*المادة الثالثة عشرة - أحكام عامة:*"
            : "*Article 13 - General Provisions:*"}
        </h5>
        <p>
          {lang === "ar" ? (
            <div>
              <div className="p-2">
                1. يحق للموقع تعديل أي من بنود هذه الاتفاقية من وقت لآخر.
              </div>
              <div className="p-2">
                2. يجب على الأطراف الالتزام بالتعامل وفقاً للقوانين والأنظمة
                المعمول بها.
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2">
                1. The site has the right to amend any of the provisions of this
                agreement from time to time.
              </div>
              <div className="p-2">
                2. The parties must adhere to conduct in accordance with
                applicable laws and regulations.
              </div>
            </div>
          )}
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
