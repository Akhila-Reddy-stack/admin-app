import classnames from "classnames";
import { asField } from "informed";
import React, { Fragment } from "react";

export const DatePicker = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const {
    field,
    onChange,
    onBlur,
    initialValue,
    forwardedRef,
    className,
    content,
    icon,
    faClass,
    ...rest
  } = props;
  return (
    <Fragment>
      <div className="form-group">
        {faClass && !icon && (
          <i style={{ color: "#0268ba" }} className={faClass}></i>
        )}
        {props.label && (
          <label htmlFor={field}>
            {icon && icon}
            {props.label}
            {props.required && (
              <i className="ml-2" style={{ color: "red" }}>
                *
              </i>
            )}
          </label>
        )}
        <input
          {...rest}
          id={field}
          type="date"
          ref={forwardedRef}
          required={false}
          value={!value && value !== 0 ? "" : value}
          className={classnames(`form-control ${className}`, {
            "is-invalid": fieldState.error,
          })}
          onChange={(e) => {
            setValue(e.target.value);
            if (onChange) {
              onChange(e);
            }
          }}
          onBlur={(e) => {
            if (props.required) {
              setTouched(true);
              if (onBlur) {
                onBlur(e);
              }
            }
          }}
        />
        {props.helper && (
          <small className="form-text text-muted">{content}</small>
        )}

        {fieldState.error ? (
          <div className="invalid-field">{fieldState.error}</div>
        ) : null}
      </div>
    </Fragment>
  );
});
