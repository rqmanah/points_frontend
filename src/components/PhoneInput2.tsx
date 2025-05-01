import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormContext, Controller } from "react-hook-form";

const dialingCodeToCountry = {
  "966": "sa", 
  "971": "ae", 
  "20": "eg",  
};

type PhoneInput2_TP = {
  label: string;
  customClass?: string;
  name: string;
};

const PhoneInput2 = ({ label, customClass, name }: PhoneInput2_TP) => {
  const {
    control,
    setValue,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext();

  const formValues = watch();
  const [phoneWithCode, setPhoneWithCode] = useState("");
  const [countryCode, setCountryCode] = useState(formValues.dialing_code || "");

  useEffect(() => {
    if (formValues[name] !== undefined) {
      setPhoneWithCode(`${countryCode}${formValues[name]}`);
    }
    if (formValues?.dialing_code !== undefined) {
      setCountryCode(formValues.dialing_code);
    }
  }, [formValues, countryCode, name]);

  const handlePhoneChange = (
    value: string,
    selectedCountry: { dialCode: string }
  ) => {
    const dialCodeLength = selectedCountry?.dialCode.length;
    const phoneWithoutCode = value.slice(dialCodeLength); 
    setPhoneWithCode(value); 
    setCountryCode(selectedCountry?.dialCode); 
    setValue(name, phoneWithoutCode);
    setValue("dialing_code", "+" + selectedCountry?.dialCode);
  };

  const isError = !!touchedFields[name] && !!errors[name];
  const generateClassName = () => {
    const baseClasses = "form-control";
    const errorClasses = "is-invalid";
    return `${baseClasses} ${isError ? errorClasses : ""} ${customClass}`;
  };

  const defaultCountry = dialingCodeToCountry[countryCode?.replace('+', '')] || 'sa';

  return (
    <div className="mb-3 p-0">
      <label className="form-label">{label}</label>
      <div dir="ltr">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <PhoneInput
              country={defaultCountry} // تعيين الدولة الافتراضية
              onlyCountries={["sa", "ae", "eg"]}
              value={phoneWithCode} // عرض الرقم مع مفتاح الدولة في الحقل
              onChange={handlePhoneChange}
              // onBlur={handleBlur}
              id="phone"
              placeholder="رقم الجوال"
              masks={{
                sa: ".. ... ....",
                ae: ".. ... ....",
                eg: ".. .... ....",
              }}
              inputProps={{
                name: name,
              }}
              className={generateClassName()}
            />
          )}
        />
      </div>
      {errors[name] && (
        <div className="invalid-feedback">{errors[name]?.message}</div>
      )}
    </div>
  );
};

export default PhoneInput2;
