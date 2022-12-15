import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  top: 10px;
  height: calc(100% - 20px);
  width: 70%;
  position: absolute;
  border: 1px solid grey;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  background-color: lightgrey;
`;

const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  height: 50px;
`;

const DATA = [
  {
    data_quality_index: 85,
    metrics: {
      duplicates_detected: false,
      nulls_detected: false,
      empty_cells: false,
      mixed_data_types: false,
      mixed_chars: false,
      incorrect_spaces: false,
      incorrect_special_chars: false,
      attribute_limit_number_exceeded: false,
      created_at_attr: true,
      modified_at_attr: true,
      redundancy_level_exceeded: {
        true_for_some_attributes: true,
        false_for_some_attributes: false,
        false_for_all: false,
        true_for_all: false,
      },
      referential_integrity: false,
      id_column: false,
      last_update_within_24_hours: true,
      anomalies: {
        no_anomalies: false,
        non_critical_anomalies: true,
        critical_anomalies: false,
      },
    },
  },
];

const MetricsDisplay = () => {
  return (
    <div className="container-all">
      <h1 className="container-big">
        Индекс качества базы: {DATA[0]?.data_quality_index}
      </h1>
      <div className="container-metrics">
        <h2 className="header-1">Метрики:</h2>
        <div>
          Обнаружены дубликаты:{" "}
          {DATA[0]?.metrics.duplicates_detected ? "Да ⚠️" : "Нет ✅"}
        </div>
        <div>
          Обнаружены null-значения:{" "}
          {DATA[0]?.metrics.nulls_detected ? "Да ⚠️ " : "Нет ✅"}
        </div>
        <div>
          Пустые ячейки: {DATA[0]?.metrics.empty_cells ? "Да ⚠️ " : "Нет ✅"}
        </div>
        <div>
          Смешаные типы данных: {DATA[0]?.mixed_data_types ? "Да ⚠️" : "Нет ✅"}
        </div>
        <div>
          Смешаные буквы (?): {DATA[0]?.mixed_chars ? "Да ⚠️ " : "Нет ✅"}{" "}
        </div>
        <div>
          Лишние пробелы: {DATA[0]?.incorrect_spaces ? "Да ⚠️ " : "Нет ✅"}
        </div>
        <div>
          Неправильные знаки:{" "}
          {DATA[0]?.incorrect_special_chars ? "Да ⚠️ " : "Нет ✅"}
        </div>
        <div>
          Исчерпан лимит знаков:{" "}
          {DATA[0]?.attribute_limit_number_exceeded ? "Да ⚠️ " : "Нет ✅"}
        </div>
        <div>
          Атрибут "Created at": {DATA[0]?.created_at_attr ? "Да ✅" : "Нет ⚠️"}
        </div>
        <div>
          Атрибут "Modified at":{" "}
          {DATA[0]?.modified_at_attr ? "Да ✅" : "Нет ⚠️"}
        </div>
      </div>
      <div className="container-integrity">
        <h2>Превышение уровеня избыточности:</h2>
        <div>
          Верно для некоторых атрибутов:{" "}
          {DATA[0]?.true_for_some_attributes ? "Да ⚠️" : "Нет ✅"}
        </div>
        <div>
          Неверно для некоторых атрибутов:{" "}
          {DATA[0]?.false_for_some_attributes ? "Да ✅" : "Нет ⚠️"}
        </div>
        <div>
          Неверно для всех атрибутов:{" "}
          {DATA[0]?.false_for_all ? "Да ✅" : "Нет ⚠️"}
        </div>
        <div>
          Верно для всех атрибутов: {DATA[0]?.true_for_all ? "Да ⚠️" : "Нет ✅"}
        </div>
        <div>
          Ссылочная целостность:{" "}
          {DATA[0]?.referential_integrity ? "Да ⚠️" : "Нет ✅"}
        </div>
        <div>
          Наличие колонки идендификатора:{" "}
          {DATA[0]?.id_column ? "Да ✅" : "Нет ⚠️"}
        </div>
        <div>
          Обновление базы в последние 24 часа:{" "}
          {DATA[0]?.last_update_within_24_hours ? "Да ✅" : "Нет ⚠️"}
        </div>
      </div>
      <div className="container-anomalies">
        <h2>Аномалии:</h2>
        <div>
          Аномалии отсутсвуют: {DATA[0]?.no_anomalies ? "Да ✅" : "Нет ⚠️"}
        </div>
        <div>
          Наличие некритичных аномалий:{" "}
          {DATA[0]?.non_critical_anomalies ? "Да ⚠️" : "Нет ✅"}
        </div>
        <div>
          Наличие критичных аномалий:{" "}
          {DATA[0]?.critical_anomalies ? "Да 🛑" : "Нет ✅"}
        </div>
      </div>
    </div>
  );
};

const FileUploader = (props) => {
  const [isShown, setIsShown] = useState(false);
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setIsShown(!isShown);
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  return (
    <>
      <Button onClick={handleClick}>Загрузите базу</Button>

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {isShown && (
        <>
          <Wrapper>
            <ButtonContainer>
              <MetricsDisplay />
            </ButtonContainer>
          </Wrapper>
        </>
      )}
    </>
  );
};
export default FileUploader;
