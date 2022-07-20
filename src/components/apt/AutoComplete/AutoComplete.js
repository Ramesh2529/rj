import React from "react";
import "./AutoComplete.scss";

const Autocomplete = ({ onFsListItem, setBtnTitle, type = [] }) => {
  // const [type, setType] = useState(appointmentTypeData);

  // const onAppointmentList = (item) => {
  //   const tempApp = [...appointmentTypeData];
  //   tempApp.map((typeItem, typeIdx) => {
  //     if (typeItem.id === item.id) {
  //       setBtnTitle(item.title);
  //       typeItem.isSelect = true;
  //     } else {
  //       typeItem.isSelect = false;
  //     }
  //   });
  //   setType(tempApp);
  //   setIsAppModal(false);
  // };

  return (
    <div className="ne_dropdown_menu">
      <ul className="ne_dropdown_list">
        {type.map((appTypItem, idx) => {
          return (
            <li
              className="ne-scope py-2 p-0"
              key={idx}
              onClick={() => onFsListItem(appTypItem)}
            >
              <a className="ne_dropdown_item">
                <span className="ne-binding">{appTypItem.value}</span>
                {/* {appTypItem.isSelect && <FiCheck className="fc_checkmark" />} */}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Autocomplete;
