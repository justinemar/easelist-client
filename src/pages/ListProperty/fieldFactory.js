import React, { useEffect, useState } from "react";

const FieldFactory = props => (
  <>
    <h1 className="panel-heading is-size-3 has-text-black">
      {props.title ? props.title : ""}
    </h1>
    <div className="field is-horizontal">
      <div className="field-body">{props.children}</div>
    </div>
  </>
);

FieldFactory.TextArea = props => {
  const { renderProps } = props;

  return (
    <div class="field">
      <label class="label">{renderProps.label}</label>
      <div class="control">
        <textarea
          name={renderProps.name}
          onChange={renderProps.func}
          class="textarea is-light"
          placeholder={renderProps.label}
        ></textarea>
      </div>
    </div>
  );
};

FieldFactory.Select = props => {
  const { renderProps } = props;

  return renderProps.isMulti ? (
    renderProps.data.map(c => (
      <div className="field">
        <label className="label">{c.label}</label>
        <div className="control has-icons-left">
          <span class="select">
            <select name={c.name} onChange={renderProps.func}>
              <option>Select</option>
              {Array.isArray(c.options)
                ? c.options.map(i => {
                    return (
                      <>
                        <option>{i}</option>
                      </>
                    );
                  })
                : renderProps.data[c.options].options.map(i => {
                    return (
                      <>
                        <option>{i}</option>
                      </>
                    );
                  })}
            </select>
          </span>
          <span class="icon is-small is-left">
            <i class={renderProps.icon || c.icon}></i>
          </span>
        </div>
      </div>
    ))
  ) : (
    <div className="field">
      <label className="label">{renderProps.label}</label>
      <div className="control has-icons-left">
        <span class="select">
          <select name={renderProps.name} onChange={renderProps.func}>
            <option>Select</option>
            {renderProps.options.map(i => {
              return (
                <>
                  <option>{i}</option>
                </>
              );
            })}
          </select>
        </span>
        <span class="icon is-small is-left">
          <i class={renderProps.icon}></i>
        </span>
      </div>
    </div>
  );
};

FieldFactory.DynamicInput = props => {
  const { renderProps } = props;

  return (
    <div className="field">
      <label className="label">{renderProps.label}</label>
      <div className="buttons">
        {renderProps.data
          ? renderProps.data.map(i => {
              return <a className="button is-info">{i}</a>;
            })
          : null}
      </div>
      <div className="field has-addons">
        <div className="control has-icons-left is-expanded">
          <input
            className="input is-light"
            type={renderProps.type}
            name={renderProps.name}
            placeholder={renderProps.placeholder}
            onChange={renderProps.onChange}
          />
          <span class="icon is-small is-left">
            <i class={renderProps.icon}></i>
          </span>
        </div>
        <div class="control">
          <a
            class="button is-info"
            name={renderProps.name}
            onClick={e => renderProps.onClick(e)}
          >
            Add
          </a>
        </div>
      </div>
    </div>
  );
};

FieldFactory.CheckBox = props => {
  const { renderProps } = props;

  return (
    <div className="field is-grouped is-grouped-multiline">
      <div className="control has-icons-left has-text-black">
        <input
          onChange={renderProps.func}
          className="is-checkradio"
          id={renderProps.id}
          type="checkbox"
          name={renderProps.name}
          value={renderProps.value}
        />
        <label for={renderProps.id}>{renderProps.label}</label>
      </div>
    </div>
  );
};

FieldFactory.Input = props => {
  const { renderProps } = props;

  return (
    <div class="field">
      <label class="label">{renderProps.label}</label>
      {renderProps.staticText ? (
        <div class="field has-addons">
          <p class="control">
            <a class="button is-static">{renderProps.staticText}</a>
          </p>
          <p class="control is-expanded">
            <input
              onChange={renderProps.func}
              class="input is-light"
              type={renderProps.type}
              placeholder={renderProps.label}
              name={renderProps.name}
            />
          </p>
        </div>
      ) : (
        <p class="control is-expanded has-icons-left">
          <input
            onChange={renderProps.func}
            class="input is-light"
            type={renderProps.type}
            placeholder={renderProps.label}
            name={renderProps.name}
          />
          {renderProps.icon ? (
            <span class="icon is-small is-left">
              <i class={renderProps.icon}></i>
            </span>
          ) : (
            <></>
          )}
        </p>
      )}
    </div>
  );
};

const FileHandler = props => {
  const { renderProps } = props;
  const [previewImages, setPreviews] = useState([]);
  const imageUpload = React.createRef();

  const previewFile = e => {
    const images = [];
    const fileList = Array.from(imageUpload.current.files);
    const MAX_FILE =
      e.currentTarget.files.length + previewImages.length > renderProps.limit
        ? true
        : false;
    if (MAX_FILE) {
      const message = renderProps.alert || "MAX IMAGES REACHED";
      alert(message);
      return;
    }

    for (let i = 0; i < e.currentTarget.files.length; i++) {
      const file = e.currentTarget.files[i];
      const image = URL.createObjectURL(file);
      images.push(image);
    }
    setPreviews([...previewImages, ...images]);
    renderProps.addData(fileList);
  };

  const removePreview = index => {
    renderProps.removeData(index);
    const previews = [...previewImages];
    previews.splice(index, 1);
    setPreviews(previews);
  };

  const FilePreview = () => {
    if (previewImages.length > 0) {
      const renderImage = previewImages.map((i, index) => (
        <div
          className="column is-two-third is-half-tablet"
          onClick={() => removePreview(index)}
          key={index}
        >
          <div
            className="image-preview"
            style={{ backgroundImage: `url(${i})` }}
          />
        </div>
      ));

      return renderImage;
    }

    return null;
  };

  return (
    <div class="field is-centered">
      <div className="field">
        <div class="file is-centered is-boxed is-success has-name">
          <label class="file-label">
            <input
              name="image"
              onClick={event => {
                event.target.value = null;
              }}
              accept="image/*"
              ref={imageUpload}
              onChange={previewFile}
              className="file-input"
              type="file"
              multiple
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">{renderProps.text}</span>

              <span class="file-label">max: ({renderProps.limit})</span>
            </span>
          </label>
        </div>
      </div>
      <div className="field">
        <div className="columns is-multiline">
          <FilePreview />
        </div>
      </div>
    </div>
  );
};

FieldFactory.FileUpload = FileHandler;

export default FieldFactory;
