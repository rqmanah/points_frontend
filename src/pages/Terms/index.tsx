import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Terms() {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(localStorage.getItem("i18nextLng") || "ar");

  const handleLanguageChange = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    i18n.changeLanguage(newLang);
    document.title = t("Terms of Service");

    localStorage.setItem("lang", newLang);
  };
  const companyName = "RAQAMNA INFORMATION TECHNOLOGY CO.L.L.C";

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.title = t("Terms of Service");
  }, [lang, i18n ]);
  
  document.title = "شروط الخدمة";
  return (
    <div className="p-5" dir="auto">
      <div>
        <Switch checked={lang === "en"} onChange={handleLanguageChange} />
        {lang === "ar" ? "اللغة العربية" : "English"}
      </div>
      <h1 className="pagetitle">
        {lang === "en" ? "Terms of Service" : "شروط الخدمة"}
      </h1>
      <p>
        {lang === "en"
          ? `

          Overview The Site is operated by Raqmanah Company. 
          Throughout the Site, the terms “we”, “us” and “our” refer to Raqmanah Company. 
           ${companyName} Company offers this website, 
          including all information, tools and services available to you as a user of the Site,
           subject to your acceptance of all terms, conditions, policies and notices set forth below. 
           By visiting and/or purchasing something from our Site, you acknowledge your engagement with our “Service” and agree to be bound by the following terms and conditions (collectively, “Terms of Service”, “Terms”),
            including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the Site, including without limitation users who are browsers,
             vendors, customers, merchants, and/or contributors of content.
          `
          : `
         نظرة عامة يدير الموقع شركة رقمنة، وتشير مصطلحات “نحن” و”لنا” و”خاصتنا” في الموقع إلى شركة رقمنة. تقدم شركة ${companyName} هذا الموقع، بما في ذلك جميع المعلومات والأدوات والخدمات المتاحة لك كمستخدم للموقع، بشروط قبولك لجميع الشروط والأحكام والسياسات والإشعارات الموضحة أدناه. إن زيارتك لموقعنا و/أو شراء شيء منه، يُعَد إقرارًا منك بتفاعلك “خدمتنا”، وموافقتك على الالتزام بالشروط والأحكام التالية (سُنطلق عليها اختصارًا “شروط الخدمة”، “الشروط”)، بما في ذلك الشروط والأحكام والسياسات الإضافية المشار إليه هنا و/أو المتاحة في الروابط الفائقة. تنطبق شروط الخدمة على جميع مستخدمي الموقع، بما في ذلك على سبيل المثال لا الحصر المستخدمين الذين يقومون بالتصفح و/أو البائعين و/أو العملاء و/أو التجار و/أو المساهمين بالمحتوى.
          `}
      </p>
      <br />
      <p>
        {lang === "en"
          ? `
          Please read these Terms of Service carefully before accessing or using our website. 
          By accessing or using any part of the site, you confirm your agreement to be bound by these Terms of Service.
           If you do not agree to all the terms and conditions of this agreement,
            then you may not access the Website or use any services. If these Terms of Service are considered an offer,
             acceptance is expressly limited to these Terms of Service. Any new features or tools which are added to the current store shall also be subject to the Terms of Service. 
             You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of the Terms of Service by posting updates and/or changes to our site.
              It is your responsibility to check this page periodically for any changes. Your continued use of or access to the Site following the posting of any changes constitutes acceptance of those changes. Our Site is hosted on OVH, Inc.,
               which provides us with the cloud computing that enables us to offer our Services to you.
          `
          : `
          
          
يرجى قراءة شروط الخدمة بعناية قبل دخول موقعنا الإلكتروني أو استخدامه، إن دخولك أو استخدامك لأي جزء من الموقع يُعد إقرارًا منك بموافقتك على الالتزام بشروط الخدمة. إذا كنت لا توافق على جميع شروط وأحكام هذه الاتفاقية، فلا يجوز لك الوصول إلى موقع الويب أو استخدام أي خدمات. إذا كانت شروط الخدمة هذه بمثابة عرض، فإن القبول يقتصر صراحةً على شروط الخدمة هذه فقط. أي خصائص أو أدوات جديدة تُضاف إلى المتجر الحالي يجب أن تخضع إلى شروط الخدمة أيضًا. يمكنك مراجعة أحدث نسخة من شروط الخدمة في أي وقت في هذه الصفحة. نحن نحتفظ بالحق في تحديث أو تغيير أو استبدال أي جزء من شروط الخدمة من خلال نشر التحديثات و/أو التغييرات في موقعنا. تقع عليك مسئولية التحقق من هذه الصفحة دوريًا لمتابعة أي تغييرات، واستمرارك في استخدام أو دخول الموقع بعد نشر أي تغييرات يعتبر بمثابة موافقة منك لتلك التغييرات. إن موقعنا مستضاف على شركة OVH، التي تزودنا بحواسيب سحابية والتي تتيح لنا عرض خدماتنا إليك.
          `}
      </p>{" "}
      <br />
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `
            Site Terms of Use:
            `
            : `
            شروط الاشتراك بالموقع :
            
            `}
        </p>{" "}
        <br />
        <p>
          {" "}
          {lang === "en"
            ? `
            Online Site Terms By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
            `
            : `
            
            شروط الموقع الأونلاين بالموافقة على شروط الخدمة هذه، تُقر بأنك على الأقل تبلغ سن الرشد في ولايتك أو منطقة إقامتك، أو أنك تبلغ سن الرشد في ولايتك أو منطقة إقامتك وأنك منحتنا موافقتك على السماح لأي من القُصّر الذين تعولهم باستخدام هذا الموقع.
            `}
        </p>{" "}
        <p>
          {lang === "en"
            ? `
            You may not use our products for any illegal or unauthorized purpose, nor may you violate any laws in your jurisdiction in using the Service (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.

            `
            : `
           
لا يجوز لك استخدام منتجاتنا لأي غرض غير قانوني أو غير مصرح به، ولا يجوز لك انتهاك أي قوانين في ولايتك القضائية عند استخدام الخدمة (بما في ذلك قوانين حقوق النشر على سبيل المثال لا الحصر). يجب ألا تنقل أي ديدان فيروسية أو فيروسات أو أي رمز ذي طبيعة مدمرة. سيؤدي خرق أو انتهاك أي من الشروط إلى الإنهاء الفوري لخدماتك.
            `}
        </p>
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `General Terms:`
            : `
            
           قواعد عامة :
            `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
            General Terms We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes necessary to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transmission over networks. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us. The headings used in this Agreement are for convenience only and will not limit or otherwise affect these Terms.

            `
            : `
            
            الشروط العامة نحتفظ بالحق في رفض تقديم الخدمة لأي شخص لأي سبب وفي أي وقت. أنت تدرك أن محتواك (باستثناء معلومات بطاقة الائتمان) قد يُنقَل بدون تشفير، ويتضمن ذلك (أ) عمليات النقل عبر الشبكات المختلفة؛ و(ب) التغييرات الضرورية للتوافق والتكيف مع المتطلبات الفنية لتوصيل الشبكات أو الأجهزة. تُشفّر معلومات بطاقة الائتمان دائمًا أثناء النقل عبر الشبكات. أنت توافق على عدم إعادة إنتاج أو تكرار أو نسخ أو بيع أو إعادة بيع أو استغلال أي جزء من الخدمة، أو استخدام الخدمة، أو الوصول إلى الخدمة، أو أي جهة اتصال على الموقع الإلكتروني تُقدّم الخدمة عن طريقها، بدون إذن كتابي صريح من جانبنا. إن العناوين المستخدم في هذه الاتفاقية مكتوبة بهدف الملائمة فقط، ولن تقيد هذه الشروط أو تؤثر عليها بأي شكل.
            `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `
            Accuracy of Information:
            `
            : `
           دقة المعلومات :
            `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
            Accuracy, Completeness and Timeliness of Information We are not responsible if information made available on this site is not accurate, complete or current. The information provided on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the materials on this site is at your own risk. This site may contain certain historical information. Historical information is not current in nature and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
            `
            : `
            دقة المعلومات واكتمالها وحداثتها نحنُ لسنا المسؤولين إذا كانت المعلومات المتوفرة على هذا الموقع غير دقيقة أو كاملة أو حديثة. إن المعلومات المُقدمة في هذا الموقع موجودة كمعلومات عامة فقط، ولا ينبغي الاعتماد عليها أو استخدامها كأساس وحيد لاتخاذ القرارات دون الرجوع إلى مصادر المعلومات الأساسية أو الأدق أو الأكثر اكتمالًا أو المُحدَثة. أي اعتماد على المواد الموجودة على هذا الموقع يتم على مسؤوليتك الخاصة. قد يحتوي هذا الموقع على معلومات تاريخية معينة. إن المعلومات التاريخية ليست حديثة بطبيعتها، وموجودة كمرجع فقط، ونحن نحتفظ بالحق في تعديل محتويات هذا الموقع في أي وقت، لكننا لسنا ملزمين بتحديث أي معلومات على موقعنا. أنت توافق على مسؤوليتك عن مراقبة التغييرات على موقعنا.
            `}
        </p>
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `
            Prices:`
            : `
            
           الأسعار :
            `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `       
          Modifications to the Service and Prices Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time. We will not be liable to you or to any third party for any modification, price change, suspension or discontinuance of the Service.
            `
            : ` 
التعديلات على الخدمة والأسعار أسعار منتجاتنا عرضة للتغيير دون إشعار. نحن نحتفظ بالحق في تعديل أو إيقاف الخدمة (أو أي جزء أو محتوى منها) دون إشعار في أي وقت. لن نكون مسؤولين تجاهك أو تجاه أي طرف خارجي عن أي تعديل أو تغيير في الأسعار أو تعليق الخدمة أو وقفها.
            `}
        </p>
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Refunds:`
            : `
            
استرداد الأموال :
            `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Our service payments are non-refundable, as we offer a trial period for the service and after payment of the fee, refunds are non-refundable.
          `
            : `مدفوعات الخدمات لدينا غير قالبة للاسترداد، نظراً لأننا نتيح فترة تجربة للخدمة وبعد دفع الرسوم يصبح غير ممكنة الاسترداد
          `}
        </p>
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `
          Billing:
          `
            : `
          
          الفواتير :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Accuracy of Billing and Account Information We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole discretion, appear to be placed by dealers, resellers or distributors. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You also agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed. For more details, please review our Return Policy.

          `
            : `
          
دقة الفواتير ومعلومات الحساب نحتفظ بالحق في رفض أي طلب تطلبه من عندنا. ويحق لنا، وفقًا لتقديرنا الخاص، تقييد أو إلغاء الكميات المشتراة من كل شخص أو كل أسرة أو كل طلب. قد تشمل هذه القيود الطلبات المقدمة بواسطة أو تحت ظل نفس حساب العميل و / أو نفس بطاقة الائتمان و / أو الطلبات التي تستخدم نفس عنوان إرسال الفواتير و / أو الشحن. في حالة قيامنا بإجراء تغيير على الطلب أو إلغاءه، فقد نحاول إخطارك عن طريق التواصل بالبريد الإلكتروني و / أو عنوان إرسال الفواتير أو رقم الهاتف المقدم في وقت تقديم الطلب. نحن نحتفظ بالحق في تقييد أو حظر الطلبات التي يبدو أنها مقدمة من التجار أو البائعين أو الموزعين، وفقًا لتقديرنا. أنت توافق على تقديم معلومات الشراء والحساب المُحدثة والكاملة والدقيقة في جميع عمليات الشراء التي تتم عبر متجرنا. وتوافق أيضًا تحديث معلومات حسابك والمعلومات الأخرى على الفور، بما في ذلك عنوان بريدك الإلكتروني وأرقام بطاقات الائتمان وتواريخ انتهاء الصلاحية، حتى نتمكن من إكمال معاملاتك والاتصال بك حسب الحاجة. لمزيد من التفاصيل، يرجى مراجعة سياسة الإرجاع الخاصة بنا.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `
          Third Party Tools:
          `
            : `
          أدوات الطرف الثالث :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Third Party Tools Optional We may provide you with access to third-party tools over which we neither monitor nor have any control nor intervention. You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.

          `
            : `
          
الأدوات الاختيارية قد نوفر لك إمكانية الوصول إلى أدوات جهات خارجية لا نراقبها ولا نملك أي قدرة على التحكم أو التدخل فيها. أنت تقر وتوافق على أننا نوفر الوصول إلى هذه الأدوات “كما هي” و “بشكلها المتوافر” دون أي ضمانات أو إقرارات أو شروط من أي نوع ودون أي مصادقة. لن نتحمل أي مسؤولية من أي نوع تنشأ عن أو تتعلق باستخدامك لأدوات اختيارية تابعة لجهات خارجية. أي استخدام من جانبك للأدوات الاختيارية المقدمة من خلال الموقع سيتم على مسؤوليتك الخاصة ويخضع لتقديرك تمامًا، ويجب عليك التأكد من أنك على دراية بالشروط التي يوفر المزود (المزودين) الخارجيين ذوي الصلة الأدوات من خلالها، وأنك توافق عليها. قد نقدم أيضًا في المستقبل خدمات و/أو مميزات جديدة من خلال موقع الويب (بما في ذلك، إصدار أدوات وموارد جديدة)، وتخضع هذه المميزات و/أو الخدمات الجديدة لشروط الخدمة هذه أيضًا.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `External Links :`
            : `
الروابط الخارجية :          
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Third-Party Links Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy, and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services provided by third-parties. We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party’s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
          `
            : `
          
          
روابط الجهات الخارجية قد تشتمل بعض المحتويات والمنتجات والخدمات المتوفرة عبر خدمتنا على مواد من أطراف خارجية. قد توجهك روابط الجهات الخارجية الموجودة على هذا الموقع إلى مواقع ويب تابعة لجهات خارجية غير تابعة لنا. نحن لسنا مسؤولين عن فحص أو تقييم المحتوى أو دقته، ولا نضمن ولن نتحمل أي مسؤولية عن أي مواد أو مواقع خاصة بطرف خارجي، أو عن أي مواد أو منتجات أو خدمات أخرى يزودها أطراف خارجيين. نحن لسنا مسؤولين عن أي ضرر أو أضرار متعلقة بشراء أو استخدام السلع أو الخدمات أو الموارد أو المحتوى أو أي معاملات أخرى تتم بشكل مرتبط بأي مواقع ويب تابعة لجهات خارجية. يرجى مراجعة سياسات وممارسات الجهات الخارجية بعناية، والتأكد من فهمك لها قبل الدخول في أي معاملة. يجب توجيه الشكاوى أو المطالبات أو المخاوف أو الأسئلة المتعلقة بمنتجات الجهات الخارجية إلى الجهة الخارجية.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Accuracy of Feedback:`
            : `
دقة التعليقات :            
            `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
            User Feedback and Other Submissions If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, ‘comments’), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments. We may, but shall have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service. You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, and will not contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third party.
            `
            : `
          
تعليقات وردود أفعال المستخدمين والتقديمات الأخرى إذا قمت، بناءً على طلبنا، بإرسال بعض التقديمات المحددة (على سبيل المثال إدخالات المسابقة)، أرسلت -دون طلب منا- أفكار أو اقتراحات أو مقترحات أو خططًا إبداعية أو مواد أخرى سواء عبر الإنترنت أو عبر البريد الإلكتروني أو البريد العادي أو غير ذلك (سنطلق عليها إجمالاً “التعليقات”)، فإنك توافق على أنه يجوز لنا، في أي وقت، وبدون قيود، تعديل ونسخ ونشر وتوزيع وترجمة واستخدام أي تعليقات ترسلها إلينا بأي وسيلة أخرى. نحن لسنا ملزمين ولن نكون ملزمين (1) بالحفاظ على سرية أي تعليقات؛ (2) بدفع تعويض عن أي تعليقات؛ أو (3) بالرد على أي تعليقات. قد نقوم، بمراقبة أو تعديل أو إزالة المحتوى الذي نحدده وفقًا لتقديرنا الخاص بأنه غير قانوني أو مسيء أو مهدد أو تشهيري أو إباحي أو فاحش أو مرفوض أو ينتهك الملكية الفكرية لأي طرف أو شروط الخدمة، ولكننا لسنا ملزمين بفعل ذلك على الإطلاق. أنت توافق على أن تعليقاتك لن تنتهك أي حق لأي طرف خارجي، بما في ذلك حقوق النشر أو العلامة التجارية أو الخصوصية أو الشخصية أو أي حقوق شخصية أو حقوق ملكية أخرى. أنت توافق أيضًا على أن تعليقاتك لن تحتوي على مواد تشهيرية أو غير قانونية أو مسيئة أو فاحشة، وأنها لن تحتوي على أي فيروسات كمبيوتر أو برامج ضارة أخرى يمكن أن تؤثر بأي شكل من الأشكال على تشغيل الخدمة أو أي موقع ويب ذي صلة. لا يجوز لك استخدام عنوان بريد إلكتروني مزيف، أو التظاهر بأنك شخص آخر غيرك، أو تضليلنا أو تضليل الأطراف الخارجية فيما يتعلق بأصل أي تعليقات. أنت وحدك المسؤول عن أي تعليقات تدلي بها ودقتها. نحن لا نتحمل أي مسؤولية ولا نتحمل أي التزام قانوني عن أي تعليقات تنشرها أنت أو أي طرف خارجي.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Personal Information:`
            : `
          المعلومات الشخصية :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Personal Information Your submission of personal information through the Store is governed by our Privacy Policy. To view our Privacy Policy, click here.
          `
            : `
          المعلومات الشخصية إن تقديمك لمعلومات شخصية عبر المتجر محكوم بسياسة خصوصيتنا. للإطلاع على سياسة خصوصيتنا اضغط هنا.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Errors:
          `
            : `
          الاخطاء :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Errors, Inaccuracies and Omissions Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if there are any inaccuracies in the Service or on any related website, at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website should be taken to indicate that all information in the Service or on any related website has been modified or updated.
          `
            : `
الأخطاء وعدم الدقة والسهو من حين لآخر، قد يوجد معلومات على موقعنا أو في الخدمة تحتوي على أخطاء مطبعية أو عدم دقة أو سهو فيما يتعلق بأوصاف المنتج والتسعير والعروض الترويجية والعروض ورسوم شحن المنتج وأوقات الترانزيت والتوافر. نحتفظ بالحق في تصحيح أي أخطاء أو عدم دقة أو سهو، وتغيير المعلومات أو تحديثها أو إلغاء الطلبات إذا كان هناك أي معلومات غير دقيقة في الخدمة، أو على أي موقع إلكتروني ذي صلة، في أي وقت دون إشعار مسبق (بما في ذلك بعد تقديمك لطلبك) . نحن لا نتعهد بتحديث أو تعديل أو توضيح المعلومات الموجودة في الخدمة أو على أي موقع ويب ذي صلة، بما في ذلك على سبيل المثال لا الحصر، معلومات التسعير، باستثناء ما يقتضيه القانون. لا يجب اعتبار أي تحديث محدد أو تاريخ تحديث مطبق على الخدمة أو على أي موقع ويب ذي صلة، بمثابة دليل على أن جميع المعلومات الموجودة في الخدمة أو أي موقع ويب ذي صلة تم تعديلها أو تحديثها.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Prohibited Uses:`
            : `
          الاستخدامات المحظورة :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Prohibited Uses In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the Site or its Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, race, ethnicity, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the performance or operation of the Service, or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (l) to send any malicious or unsolicited advertising, spider, crawl, scrape, or spoof messages; (j) to any For an obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
          `
            : `
          الاستخدامات المحظورة بالإضافة إلى المحظورات الأخرى المنصوص عليها في شروط الخدمة، يُحظر عليك استخدام الموقع أو محتواه: (أ) لأي غرض غير قانوني؛ (ب) لحث الآخرين على أداء في أي أعمال غير قانونية أو المشاركة فيها؛ (ج) لانتهاك أي لوائح أو قواعد أو قوانين أو مراسيم محلية دولية أو فيدرالية أو إقليمية أو خاصة بالولاية؛ (د) التعدي على أو انتهاك حقوق الملكية الفكرية الخاصة بنا أو حقوق الملكية الفكرية للآخرين؛ (هـ) المضايقة أو الإساءة أو الإهانة أو الأذى أو التشهير أو القذف أو الاستخفاف أو التخويف أو التمييز على أساس الجنس أو التوجه الجنسي أو الدين أو العرق أو الأصل العرقي أو السن أو الأصل القومي أو الإعاقة؛ (و) لتقديم معلومات خاطئة أو مضللة؛ (ز) لتحميل أو نقل فيروسات أو أي نوع آخر من الشفرات الخبيثة التي سيتم استخدامها أو يمكن استخدامها بأي طريقة من شأنها التأثير على أداء أو تشغيل الخدمة، أو أي موقع ويب ذي صلة أو مواقع ويب أخرى أو الإنترنت؛ (ح) لجمع أو تتبع المعلومات الشخصية للآخرين؛ (ل) إرسال رسائل إعلانية خبيثة أو إعلانية أو عنكبوتية أو زاحفة أو كاشطة أو متسللة أو مخادعة؛ (ي) لأي غرض فاحش أو غير أخلاقي؛ أو (ك) للتدخل أو التحايل على ميزات الأمان الخاصة بالخدمة أو أي موقع ويب ذي صلة أو مواقع ويب أخرى أو الإنترنت. نحتفظ بالحق في إنهاء استخدامك للخدمة أو أي موقع ويب ذي صلة في حال انتهاكك لأي من الاستخدامات المحظورة.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Disclaimer:`
            : `
إخلاء مسؤولية :          
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Disclaimer of Warranties and Limitation of Liability We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable. You agree that from time to time, we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you. You expressly agree that your use of, or inability to use, the service is at your sole risk. The Service and all products and services delivered to you through it (except as expressly stated by us) are provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement. In no case shall Raqmana, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or from any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.

          `
            : `
          إخلاء المسؤولية عن الضمانات وتحديد المسؤولية نحن لا نضمن أو نمثل أو نقدم ضمان بأن استخدامك لخدمتنا سيتم دون انقطاع أو في الوقت المحدد أو بشكل آمن أو خالي من الأخطاء. نحن لا نضمن أن النتائج التي ستحصل عليها من استخدام الخدمة ستكون دقيقة أو موثوقة. أنت توافق على أنه يحق لنا من وقت لآخر إزالة الخدمة لفترات زمنية غير محددة أو إلغاء الخدمة في أي وقت دون إشعارك. أنت توافق صراحة على أن استخدامك للخدمة أو عدم قدرتك على استخدامها يكون مسؤوليتك وحدك. إن الخدمة وجميع المنتجات والخدمات المقدمة لك من خلالها (باستثناء ما هو مذكور صراحةً من قبلنا) مقدمة “كما هي” و “بالشكل المتوافر” لاستخدامك، دون أي تمثيل أو ضمانات أو شروط من أي نوع، سواء كانت صريحة أو ضمنية، بما في ذلك جميع الضمانات الضمنية، أو شروط القابلية للتسويق، والجودة التجارية والملاءمة لغرض معينـ والمتانة، والملكيةـ وعدم الانتهاك. لا يجوز بأي حال من الأحوال أن تتحمل شركة رقمنة أو مديرينا أو مسؤولينا أو موظفينا أو الشركات التابعة لنا أو الوكلاء أو المقاولين أو المتدربين أو الموردين أو مقدمي الخدمات أو المرخصين، المسؤولية عن أي إصابة أو خسارة أو مطالبة أو أي ضرر مباشر أو غير مباشر أو عرضي أو عقابي أو خاص، أو الأضرار التبعية من أي نوع، بما في ذلك، على سبيل المثال لا الحصر، خسارة الأرباح ، أو خسارة الإيرادات، أو فقدان المدخرات، أو فقدان البيانات، أو تكاليف الاستبدال، أو أي أضرار مماثلة، سواء كانت قائمة على العقد، أو المسؤولية التقصيرية (بما في ذلك الإهمال)، أو المسؤولية الصارمة أو غير ذلك، والناشئة عن استخدامك لأي خدمة أو أي منتجات تم شراؤها باستخدام الخدمة أو الناشئة عن أي مطالبة أخرى تتعلق بأي شكل من الأشكال باستخدامك للخدمة أو أي منتج، بما في ذلك على سبيل المثال لا الحصر: أي أخطاء أو سهو في أي محتوى، أو أي خسارة أو ضرر من أي نوع يحدث نتيجة لاستخدام الخدمة أو أي محتوى (أو منتج) يتم نشره أو نقله أو إتاحته بطريقة أخرى عبر الخدمة، حتى لو تم التنبيه إلى إمكانية حدوث ذلك. نظرًا إلى بعض الولايات أو الولايات القضائية لا تسمح باستثناء أو تحديد المسؤولية عن الأضرار التبعية أو العرضية، يجب أن تكون مسؤوليتنا محدودة إلى أقصى حد يسمح به القانون في مثل هذه الولايات أو الولايات القضائية
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Indemnification:`
            : `
التعويضات :          
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          Indemnification You agree to indemnify, defend and hold harmless Digitalization and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents referenced herein, or your violation of any law or the rights of a third-party.
          `
            : `
          التعويض أنت توافق على تعويض شركة رقمنة والشركات التابعة لها والشركات التابعة لها والشركاء والمسؤولين والمديرين والوكلاء والمقاولين والمرخصين ومقدمي الخدمات والمقاولين من الباطن والموردين والمتدربين والموظفين، والدفاع عنها وحمايتها من أي مطالبة أو طلب، بما في ذلك أتعاب المحاماة المعقولة، التي يقدمها أي طرف خارجي بسبب أو نتيجة خرقك لشروط الخدمة أو المستندات المشار إليها فيها، أو انتهاكك لأي قانون أو حقوق للطرف الخارجي
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `
          Enforcement of Agreement:
          `
            : `
تنفيذ الاتفاقية :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
            Severability In the event that any provision of the Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from the Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
            `
            : `
          القابلية للفصل في حالة تحديد أن أي شرط من شروط الخدمة غير قانوني أو باطل أو غير قابل للتنفيذ ، يجب أن يكون هذا الحكم قابلاً للتنفيذ إلى أقصى حد يسمح به القانون المعمول به، ويعتبر الجزء غير القابل للتنفيذ منفصلاً عن شروط الخدمة، ولن يؤثر هذا القرار على صلاحية وإنفاذ أي شروط أخرى متبقية
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `
            Termination of Agreement:
            `
            : `
إنهاء الاتفاقية :            
            `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
            Termination Remains The obligations and liabilities of the parties agreed upon prior to the termination date shall survive the termination of this Agreement for all purposes. These Terms of Service will remain in effect unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our Site. If in our sole discretion you fail, or we suspect that you have failed, to comply with any term or provision of the Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination, and accordingly we may deny you access to our Services (or any part thereof).

            `
            : `    
الإنهاء تظل التزامات ومسؤوليات الأطراف المُوافَق عليها قبل تاريخ إنهاء الاتفاقية سارية بعد إنهاء هذه الاتفاقية في جميع الأغراض. ستظل شروط الخدمة هذه سارية المفعول ما لم يتم إنهاؤها من قبلك أو من قبلنا. يمكنك إنهاء شروط الخدمة هذه في أي وقت عن طريق إخطارنا بأنك لم تعد ترغب في استخدام خدماتنا، أو عندما تتوقف عن استخدام موقعنا. إذا حكما وفقًا لتقديرنا المُطلق بأنك أخفقت، أو شككنا بأنك أخفقت، في الامتثال بأي بند أو شروط من شروط الخدمة، فيجوز لنا أيضًا إنهاء هذه الاتفاقية في أي وقت دون إشعار مسبق وستظل مسؤولاً عن جميع المبالغ المستحقة حتى تاريخ الإنهاء، ووفقًا لذلك، قد نمنعك من الوصول إلى خدماتنا (أو أي جزء منها).
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Terms of Agreement:`
            : `
          بنود الاتفاقية :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
            Entire Agreement Our failure to enforce or enforce any right or provision of the Terms of Service shall not constitute a waiver of such right or provision. These Terms of Service, and any policies or operating rules posted by us on this site or in respect to the Service, constitute the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals between you and us, whether oral or written (including, but not limited to, any prior versions of the Terms of Service). Any ambiguities in the interpretation of these Terms of Service shall not be construed to the disadvantage of the drafting party.
            `
            : `    
الاتفاقية الكاملة لا يشكل إخفاقنا في تطبيق أو إنفاذ أي حق أو شرط من شروط الخدمة تنازلاً عن هذا الحق أو الشرط. تشكل شروط الخدمة، وأي سياسات أو قواعد تشغيل نشرناها على هذا الموقع أو فيما يتعلق بالخدمة، الاتفاقية الكاملة والتفاهم بينك وبيننا، وتحكم استخدامك للخدمة، وتحل محل أي اتفاقيات واتصالات ومقترحات سابقة أو معاصرة بينك وبيننا، سواء كانت شفهية أو كتابية (بما في ذلك، على سبيل المثال لا الحصر، أي إصدارات سابقة من شروط الخدمة). لا يجوز تفسير أي غموض في تفسير شروط الخدمة هذه بطريقة ليست في صالح الجهة الصائغة لها.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Governing Law:`
            : `
            القانون السائد :
            `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
            Governing Law These Terms of Service, and any separate agreements whereby we provide you Services, shall be construed and governed by the laws of Al Bisharah South, Dubai, Dubai, 42312, United Arab Emirates.
          In the event of a Service Failure, we will extend your Service to you for the duration of the Failure, and please provide us with reasonable notice.

In the event that the system is completely damaged, the affected customer will be compensated for his subscription to the platform with the value of the package he subscribed to, after proving this to Raqmana Company and that the defect is from Raqmana Company's system.

          `
            : `القانون المعمول به تُفسّر شروط الخدمة، وأية اتفاقيات منفصلة نقدم بموجبها الخدمات لك، وتخضع لقوانين البشارة جنوب، دبي، دبي، 42312، الامارات العربية المتحدة
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `In the event of a Service Failure:`
            : `
          حال تعطل الخدمة :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? ``
            : `
            في حال تعطل الخدمة يتم تعويض تلك الفترة بتمديد الخدمة لديك حسب مدة العطل ، ويرجى إخطارنا بذلك بفترة مناسبة.
وفي حال تضرر النظام بشكل كامل 
يتم تعويض العميل المتضرر من اشتراكه في المنصة بقيمة الباقة التي اشترك فيها
بعد إثبات ذلك لشركة رقمنة وان الخلل من قبل نظام شركة رقمنة
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `
            Offers:
            `
            : `
           العروض :
            `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `
          You cannot get two offers at the same time. If your package is subject to discount conditions, you will not be able to get another additional discount other than that applicable.
          `
            : `      
            لا يمكنك الحصول على عرضين بنفس الوقت، في حال كانت باقتك ينطبق عليها شروط خصم، فإنك لن تتمكن من الحصول على خصم آخر اضافي خلاف ذلك المنطبق.
          `}
        </p>{" "}
      </div>
      <div>
        <p className="card-title fs-4 fw-semibold">
          {lang === "en"
            ? `Update Agreement:`
            : `
          تحديث الاتفاقية :
          `}
        </p>{" "}
        <br />
        <p>
          {lang === "en"
            ? `Changes to the Terms of Service You can review the most current version of the Terms of Service at any time on this page. We reserve the right, at our sole discretion, to update, change or replace any part of the Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to the Terms of Service constitutes acceptance of those changes. Section 20 -
Contact Information Questions about the Terms of Service should be sent to us at into@school-points.com`
            : `
            التغييرات على شروط الخدمة يمكنك مراجعة أحدث إصدار من شروط الخدمة في أي وقت في هذه الصفحة. نحتفظ بالحق، وفقًا لتقديرنا الخاص، في تحديث أو تغيير أو استبدال أي جزء من شروط الخدمة عن طريق نشر التحديثات والتغييرات على موقعنا. وتقع على عاتقك مسؤولية التحقق من موقعنا بشكل دوري لمعرفة التغييرات. استمرار استخدامك أو دخولك إلى موقعنا على الويب أو الخدمة بعد نشر أي تغييرات على شروط الخدمة يشكل قبولًا لهذه التغييرات. القسم 20 –
معلومات التواصل يجب إرسال الأسئلة المتعلقة بشروط الخدمة إلينا على البريد الإلكتروني into@school-points.com
            `}
        </p>{" "}
      </div>
    </div>
  );
}
export default Terms;
