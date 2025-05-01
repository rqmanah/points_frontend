import { Badge } from "reactstrap";
import schools from "../../data/schools";
import ProjectTables from "../../components/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageTitle from "../../components/PageTitle";
function Settings() {
  return (
    <div>
      <PageTitle title={"الاعدادات"} />
      <div className="rtl  p-3  mt-5">
        <ProjectTables
          tableTitle={"الأعدادات"}
          tableDescription={"نبذة عن المدارس"}
          buttonTitle={"اضف مدرسة"}
          th1={"اسم المدرسة"}
          th2={"جنس المدرسة"}
          th3={"البريد الإلكتروني"}
          th4={"الهاتف"}
          th5={"تاريح الانضمام"}
          th6={"الحالة"}
          th7={"العمليات"}
        >
          {schools.map((item, index) => (
            <tr key={index} className="border-top">
              <td className="ffcairo">
                <div className="d-flex align-items-center p-2">
                  <div className="ms-3">
                    <h6 className="mb-0 ffcairo">{item.name}</h6>
                    {/* <span className="text-muted">{item.}</span> */}
                  </div>
                </div>
              </td>
              <td className="ffcairo">{item.gender}</td>
              <td className="ffcairo">{item.email}</td>
              <td className="ffcairo">{item.phone}</td>
              <td className="text-muted">{item.date}</td>
              <td>
                <Badge className="bg-success fs-6">{item.state}</Badge>
              </td>
              <td className="d-flex gap-2">
                <EditIcon color="primary" />
                <DeleteIcon className="text-danger" />
              </td>
            </tr>
          ))}
        </ProjectTables>
      </div>
    </div>
  );
}

export default Settings;
