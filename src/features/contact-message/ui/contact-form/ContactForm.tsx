import { Button, Input, Check } from "@/shared/ui/index.ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";
import classNames from "classnames";

import { useModalStore } from "@/store/modal/modal.store";

import { ContactMessageInput, contactMessageSchema } from "../../model/schema";
import { sendEmail } from "../../api/send-email";

import scss from "./ContactForm.module.scss";

const defaultValues: ContactMessageInput = {
  name: "",
  email: "",
  message: "",
  agree: false,
};

const DETAILS_ITEMS: { label: string; title: string }[] = [
  {
    label: "Длительность",
    title: "30–40 минут",
  },
  {
    label: "Формат",
    title: "Онлайн / офлайн",
  },
  {
    label: "Приватность",
    title: "Конфиденциально",
  },
  {
    label: "Связь",
    title: "Ответ в течение одного рабочего дня",
  },
];

export const ContactForm = () => {
  const [isPending, setIsPending] = useState(false);

  const { close } = useModalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: ContactMessageInput) => {
    setIsPending(true);

    try {
      const result = await sendEmail(data);

      if (result.success) {
        toast.success("Заявка успешно отправлена");
        reset(defaultValues);
      } else {
        toast.error(result.error || "Ошибка отправки заявки");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Произошла ошибка при отправке");
    } finally {
      setIsPending(false);
      close();
    }
  };

  return (
    <form className={scss["contact-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={scss["contact-form__content"]}>
        <div className={scss["contact-form__top"]}>
          <p className={classNames("h3", scss["contact-form__title"])}>
            Записаться на консультацию
          </p>

          <div className="textbox textbox--second">
            <p className="p1">
              Первый диалог поможет понять ваш запрос, откалибровать ожидания и
              выбрать наиболее точный формат работы.
            </p>
          </div>
        </div>

        <div className={scss["contact-form__inputs"]}>
          <Input
            {...register("name")}
            autoComplete="name"
            error={errors.name?.message}
            placeholder="Имя*"
            label="Имя*"
            disabled={isPending}
          />

          <Input
            {...register("email")}
            autoComplete="email"
            error={errors.email?.message}
            placeholder="E-mail*"
            label="E-mail*"
            disabled={isPending}
          />

          <Input
            {...register("message")}
            error={errors.message?.message}
            as="textarea"
            placeholder="Сообщение*"
            label="Сообщение*"
            disabled={isPending}
          />

          <Check
            {...register("agree")}
            error={errors.agree?.message}
            content={
              <p className="p3">
                Я согласен(а) с обработкой персональных данных.
              </p>
            }
          />
        </div>

        <div className={scss["contact-form__footer"]}>
          <div className={scss["contact-form__btns"]}>
            <Button
              typeBtn="submit"
              disabled={isPending}
              tooltip={isPending ? "Отправляем заявку..." : "Отправить заявку"}
              size="medium"
            >
              <p className="p2">
                {isPending ? "Отправляем заявку..." : "Отправить заявку"}
              </p>
            </Button>
          </div>
        </div>
      </div>

      <div className={scss["contact-form__details"]}>
        {DETAILS_ITEMS.map((item, index) => {
          const { label, title } = item;

          return (
            <div className={scss["contact-form__details-item"]} key={index}>
              <p
                className={classNames(
                  "p3",
                  scss["contact-form__details-item-label"]
                )}
              >
                {label}
              </p>

              <p
                className={classNames(scss["contact-form__details-item-title"])}
              >
                {title}
              </p>
            </div>
          );
        })}
      </div>
    </form>
  );
};
