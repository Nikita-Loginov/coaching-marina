"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Input,
  ImageUpload,
  Select,
  Accordeon,
  MultiBoxTextField,
  MultiBoxTitleDescriptionField,
  Check,
} from "@/shared/ui/index.ui";

import { useProgramQuery } from "../../model/useProgramQuery";

import type { ProgramContent } from "@/entities/program/model/program.types";

import {
  useCreateProgram,
  useUpdateProgram,
} from "../../model/useProgramMutations";

import {
  programSchema,
  type ProgramFormInput,
  type ProgramFormValues,
} from "@/entities/program/model/program.schema";

import scss from "../../../../screens/admin/styles/AdminForm.module.scss";

interface ProgramAdminFormProps {
  id?: string;
  mode: "create" | "edit";
}

const contentAsItems = [
  {
    value: "default",
    label: "Обычный текст",
  },
  {
    value: "list",
    label: "Список",
  },
];

const contentVariantItems = [
  {
    value: "small",
    label: "Маленькая карточка",
  },
  {
    value: "big",
    label: "Большая карточка",
  },
];

export const ProgramAdminForm = ({ id, mode }: ProgramAdminFormProps) => {
  const router = useRouter();
  const isEdit = Boolean(id);

  const { data: program, isLoading } = useProgramQuery(id);

  const createProgram = useCreateProgram();
  const updateProgram = useUpdateProgram(id ?? "");

  const defaultValues = useMemo<ProgramFormValues>(
    () => ({
      id: "",
      name: "",
      description: [""],
      descriptionFull: [""],
      as: "modal",
      btnText: "",
      btnTextInner: "",
      teamShowed: true,

      img: {
        src: "",
        alt: "",
      },

      forWhom: {
        title: "Для кого",
        items: [
          {
            desc: [""],
            as: "default",
          },
        ],
        showed: true,
        variant: "small",
      },

      suitableRequests: {
        title: "Какие запросы подходят",
        items: [
          {
            desc: [""],
            as: "default",
          },
        ],
        showed: true,
        variant: "small",
      },

      workflow: {
        title: "Как проходит работа",
        items: [
          {
            desc: [""],
            as: "default",
          },
        ],
        showed: true,
        variant: "small",
      },

      cooperationFormat: {
        title: "Формат сотрудничества",
        items: [
          {
            desc: [""],
            as: "default",
          },
        ],
        showed: true,
        variant: "small",
      },

      benefits: {
        title: "Что вы получаете",
        items: [
          {
            desc: [""],
            as: "default",
          },
        ],
        showed: true,
        variant: "small",
      },

      reviews: [],
    }),
    []
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProgramFormInput>({
    resolver: zodResolver(programSchema),
    defaultValues,
  });

  const forWhomField = useFieldArray({
    control,
    name: "forWhom.items",
  });

  const suitableRequestsField = useFieldArray({
    control,
    name: "suitableRequests.items",
  });

  const workflowField = useFieldArray({
    control,
    name: "workflow.items",
  });

  const cooperationFormatField = useFieldArray({
    control,
    name: "cooperationFormat.items",
  });

  const benefitsField = useFieldArray({
    control,
    name: "benefits.items",
  });

  const reviewsField = useFieldArray({
    control,
    name: "reviews",
  });

  useEffect(() => {
    if (program && isEdit) {
      reset({
        id: program.id,
        name: program.name,
        description: program.description,
        descriptionFull: program.descriptionFull,
        as: program.as,
        btnText: program.btnText,
        btnTextInner: program.btnTextInner,
        teamShowed: program.teamShowed,

        img: {
          src:
            typeof program.img.src === "string"
              ? program.img.src
              : String(program.img.src),
          alt: program.img.alt,
        },

        forWhom: program.forWhom,
        suitableRequests: program.suitableRequests,
        workflow: program.workflow,
        cooperationFormat: program.cooperationFormat,
        benefits: program.benefits,
        reviews: program.reviews ?? [],
      });
    }
  }, [program, isEdit, reset]);

  const onSubmit = async (data: ProgramFormInput) => {
    const parsed = programSchema.parse(data);

    try {
      if (isEdit && id) {
        await updateProgram.mutateAsync(parsed);
      } else {
        await createProgram.mutateAsync(parsed);
      }

      router.push("/admin/programs");
    } catch (error) {
      console.error("Ошибка сохранения программы:", error);
    }
  };

  if (isEdit && isLoading) {
    return <p className="p2">Загрузка программы...</p>;
  }

  return (
    <form className={scss["admin-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={scss["admin-form__top"]}>
        <Button
          theme="secondary"
          iconLeft={<ArrowLeft size={18} />}
          typeBtn="button"
          onClick={() => router.push("/admin/programs")}
        >
          <p className="p2">Назад к программам</p>
        </Button>

        <h1 className="h4">
          {isEdit ? `Редактирование: ${program?.name}` : "Создание программы"}
        </h1>
      </div>

      <div className={scss["admin-form__content"]}>
        <Accordeon
          items={[
            {
              key: "main",
              label: "Основная информация",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div className={scss["admin-form__item"]}>
                    <Input
                      label="ID"
                      placeholder="individual-coaching"
                      {...register("id")}
                      error={errors.id?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Input
                      label="Название"
                      placeholder="Индивидуальный коучинг"
                      {...register("name")}
                      error={errors.name?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Input
                      label="Текст кнопки"
                      placeholder="Подробнее о формате"
                      {...register("btnText")}
                      error={errors.btnText?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Input
                      label="Текст внутренний кнопки"
                      placeholder="Записаться на разговор"
                      {...register("btnTextInner")}
                      error={errors.btnTextInner?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Select
                      label="Тип страницы"
                      value={watch("as")}
                      items={[
                        {
                          value: "modal",
                          label: "Модальное окно",
                        },
                        {
                          value: "page",
                          label: "Отдельная страница",
                        },
                      ]}
                      onValueChange={(value) => {
                        setValue("as", value as "modal" | "page", {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <ImageUpload
                      label="Изображение"
                      value={watch("img.src")}
                      onChange={(url) => {
                        setValue("img.src", url, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      error={errors.img?.src?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Input
                      label="Описание изображения"
                      placeholder="Индивидуальный коучинг"
                      {...register("img.alt")}
                      error={errors.img?.alt?.message}
                    />
                  </div>
                </div>
              ),
            },

            {
              key: "description",
              label: "Описание",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div className={scss["admin-form__item"]}>
                    <Input
                      label="Краткое описание"
                      {...register("description.0")}
                      error={errors.description?.[0]?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Input
                      label="Полное описание"
                      {...register("descriptionFull.0")}
                      error={errors.descriptionFull?.[0]?.message}
                    />
                  </div>
                </div>
              ),
            },

            {
              key: "forWhom",
              label: "Для кого",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <Input
                      label="Заголовок"
                      {...register("forWhom.title")}
                      error={errors.forWhom?.title?.message}
                    />
                  </div>

                  {forWhomField.fields.map((field, index) => {
                    const descriptions =
                      watch(`forWhom.items.${index}.desc`) ?? [];

                    return (
                      <div
                        key={field.id}
                        className={classNames(
                          scss["admin-form__item"],
                          scss["admin-form__item--big"],
                          scss["admin-form__item--bg"]
                        )}
                      >
                        <Input
                          label={`Заголовок пункта ${index + 1}`}
                          placeholder="Заголовок"
                          {...register(`forWhom.items.${index}.title`)}
                          error={errors.forWhom?.items?.[index]?.title?.message}
                        />

                        <MultiBoxTextField
                          label={`Пункт ${index + 1}`}
                          btnAddText="Добавить описание"
                          items={descriptions.map(
                            (value, descriptionIndex) => ({
                              id: `${field.id}-${descriptionIndex}`,
                              value,
                            })
                          )}
                          onAdd={() => {
                            setValue(
                              `forWhom.items.${index}.desc`,
                              [...descriptions, ""],
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onRemove={(itemId) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            setValue(
                              `forWhom.items.${index}.desc`,
                              descriptions.filter(
                                (_, currentIndex) =>
                                  currentIndex !== descriptionIndex
                              ),
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onUpdate={(itemId, value) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            const next = [...descriptions];

                            next[descriptionIndex] = value;

                            setValue(`forWhom.items.${index}.desc`, next, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          placeholder="Описание"
                          emptyText="Нет добавленных описаний"
                          error={errors.forWhom?.items?.[index]?.desc?.message}
                        />

                        <Select
                          label="Тип отображения"
                          value={
                            watch(`forWhom.items.${index}.as`) ?? "default"
                          }
                          items={contentAsItems}
                          onValueChange={(value) => {
                            setValue(
                              `forWhom.items.${index}.as`,
                              value as "default" | "list",
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                        />

                        <Button
                          theme="secondary"
                          typeBtn="button"
                          onClick={() => forWhomField.remove(index)}
                        >
                          <p className="p3">Удалить пункт</p>
                        </Button>
                      </div>
                    );
                  })}

                  <Button
                    theme="secondary"
                    typeBtn="button"
                    onClick={() =>
                      forWhomField.append({
                        desc: [""],
                        as: "default",
                        title: "",
                      })
                    }
                  >
                    <p className="p3">Добавить пункт</p>
                  </Button>

                  <div className={scss["admin-form__item"]}>
                    <Check
                      {...register("forWhom.showed")}
                      content={
                        <p className="p3">Показывать блок на странице</p>
                      }
                      error={errors.forWhom?.showed?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Select
                      label="Размер блока"
                      value={watch("forWhom.variant")}
                      items={contentVariantItems}
                      onValueChange={(value) => {
                        setValue("forWhom.variant", value as "small" | "big", {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                  </div>
                </div>
              ),
            },

            {
              key: "suitableRequests",
              label: "Какие запросы подходят",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <Input
                      label="Заголовок"
                      {...register("suitableRequests.title")}
                      error={errors.suitableRequests?.title?.message}
                    />
                  </div>

                  {suitableRequestsField.fields.map((field, index) => {
                    const descriptions =
                      watch(`suitableRequests.items.${index}.desc`) ?? [];

                    return (
                      <div
                        key={field.id}
                        className={classNames(
                          scss["admin-form__item"],
                          scss["admin-form__item--big"],
                          scss["admin-form__item--bg"]
                        )}
                      >
                        <Input
                          label={`Заголовок пункта ${index + 1}`}
                          placeholder="Заголовок"
                          {...register(`suitableRequests.items.${index}.title`)}
                          error={
                            errors.suitableRequests?.items?.[index]?.title
                              ?.message
                          }
                        />

                        <MultiBoxTextField
                          label={`Пункт ${index + 1}`}
                          btnAddText="Добавить описание"
                          items={descriptions.map(
                            (value, descriptionIndex) => ({
                              id: `${field.id}-${descriptionIndex}`,
                              value,
                            })
                          )}
                          onAdd={() => {
                            setValue(
                              `suitableRequests.items.${index}.desc`,
                              [...descriptions, ""],
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onRemove={(itemId) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            setValue(
                              `suitableRequests.items.${index}.desc`,
                              descriptions.filter(
                                (_, currentIndex) =>
                                  currentIndex !== descriptionIndex
                              ),
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onUpdate={(itemId, value) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            const next = [...descriptions];
                            next[descriptionIndex] = value;

                            setValue(
                              `suitableRequests.items.${index}.desc`,
                              next,
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          placeholder="Описание"
                          emptyText="Нет добавленных описаний"
                          error={
                            errors.suitableRequests?.items?.[index]?.desc
                              ?.message
                          }
                        />

                        <Select
                          label="Тип отображения"
                          value={
                            watch(`suitableRequests.items.${index}.as`) ??
                            "default"
                          }
                          items={contentAsItems}
                          onValueChange={(value) => {
                            setValue(
                              `suitableRequests.items.${index}.as`,
                              value as "default" | "list",
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                        />

                        <Button
                          theme="secondary"
                          typeBtn="button"
                          onClick={() => suitableRequestsField.remove(index)}
                        >
                          <p className="p3">Удалить пункт</p>
                        </Button>
                      </div>
                    );
                  })}

                  <Button
                    theme="secondary"
                    typeBtn="button"
                    onClick={() =>
                      suitableRequestsField.append({
                        desc: [""],
                        as: "default",
                        title: "",
                      })
                    }
                  >
                    <p className="p3">Добавить пункт</p>
                  </Button>

                  <div className={scss["admin-form__item"]}>
                    <Check
                      {...register("suitableRequests.showed")}
                      content={
                        <p className="p3">Показывать блок на странице</p>
                      }
                      error={errors.suitableRequests?.showed?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Select
                      label="Размер блока"
                      value={watch("suitableRequests.variant")}
                      items={contentVariantItems}
                      onValueChange={(value) => {
                        setValue(
                          "suitableRequests.variant",
                          value as "small" | "big",
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                    />
                  </div>
                </div>
              ),
            },

            {
              key: "workflow",
              label: "Как проходит работа",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <Input
                      label="Заголовок"
                      {...register("workflow.title")}
                      error={errors.workflow?.title?.message}
                    />
                  </div>

                  {workflowField.fields.map((field, index) => {
                    const descriptions =
                      watch(`workflow.items.${index}.desc`) ?? [];

                    return (
                      <div
                        key={field.id}
                        className={classNames(
                          scss["admin-form__item"],
                          scss["admin-form__item--big"],
                          scss["admin-form__item--bg"]
                        )}
                      >
                        <Input
                          label={`Заголовок пункта ${index + 1}`}
                          placeholder="Заголовок"
                          {...register(`workflow.items.${index}.title`)}
                          error={
                            errors.workflow?.items?.[index]?.title?.message
                          }
                        />

                        <MultiBoxTextField
                          label={`Пункт ${index + 1}`}
                          btnAddText="Добавить описание"
                          items={descriptions.map(
                            (value, descriptionIndex) => ({
                              id: `${field.id}-${descriptionIndex}`,
                              value,
                            })
                          )}
                          onAdd={() => {
                            setValue(
                              `workflow.items.${index}.desc`,
                              [...descriptions, ""],
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onRemove={(itemId) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            setValue(
                              `workflow.items.${index}.desc`,
                              descriptions.filter(
                                (_, currentIndex) =>
                                  currentIndex !== descriptionIndex
                              ),
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onUpdate={(itemId, value) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            const next = [...descriptions];
                            next[descriptionIndex] = value;

                            setValue(`workflow.items.${index}.desc`, next, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          placeholder="Описание"
                          emptyText="Нет добавленных описаний"
                          error={errors.workflow?.items?.[index]?.desc?.message}
                        />

                        <Select
                          label="Тип отображения"
                          value={
                            watch(`workflow.items.${index}.as`) ?? "default"
                          }
                          items={contentAsItems}
                          onValueChange={(value) => {
                            setValue(
                              `workflow.items.${index}.as`,
                              value as "default" | "list",
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                        />

                        <Button
                          theme="secondary"
                          typeBtn="button"
                          onClick={() => workflowField.remove(index)}
                        >
                          <p className="p3">Удалить пункт</p>
                        </Button>
                      </div>
                    );
                  })}

                  <Button
                    theme="secondary"
                    typeBtn="button"
                    onClick={() =>
                      workflowField.append({
                        desc: [""],
                        as: "default",
                        title: "",
                      })
                    }
                  >
                    <p className="p3">Добавить пункт</p>
                  </Button>

                  <div className={scss["admin-form__item"]}>
                    <Check
                      {...register("workflow.showed")}
                      content={
                        <p className="p3">Показывать блок на странице</p>
                      }
                      error={errors.workflow?.showed?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Select
                      label="Размер блока"
                      value={watch("workflow.variant")}
                      items={contentVariantItems}
                      onValueChange={(value) => {
                        setValue("workflow.variant", value as "small" | "big", {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                  </div>
                </div>
              ),
            },

            {
              key: "cooperationFormat",
              label: "Формат сотрудничества",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <Input
                      label="Заголовок"
                      {...register("cooperationFormat.title")}
                      error={errors.cooperationFormat?.title?.message}
                    />
                  </div>

                  {cooperationFormatField.fields.map((field, index) => {
                    const descriptions =
                      watch(`cooperationFormat.items.${index}.desc`) ?? [];

                    return (
                      <div
                        key={field.id}
                        className={classNames(
                          scss["admin-form__item"],
                          scss["admin-form__item--big"],
                          scss["admin-form__item--bg"]
                        )}
                      >
                        <Input
                          label={`Заголовок пункта ${index + 1}`}
                          placeholder="Заголовок"
                          {...register(
                            `cooperationFormat.items.${index}.title`
                          )}
                          error={
                            errors.cooperationFormat?.items?.[index]?.title
                              ?.message
                          }
                        />

                        <MultiBoxTextField
                          label={`Пункт ${index + 1}`}
                          btnAddText="Добавить описание"
                          items={descriptions.map(
                            (value, descriptionIndex) => ({
                              id: `${field.id}-${descriptionIndex}`,
                              value,
                            })
                          )}
                          onAdd={() => {
                            setValue(
                              `cooperationFormat.items.${index}.desc`,
                              [...descriptions, ""],
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onRemove={(itemId) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            setValue(
                              `cooperationFormat.items.${index}.desc`,
                              descriptions.filter(
                                (_, currentIndex) =>
                                  currentIndex !== descriptionIndex
                              ),
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onUpdate={(itemId, value) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            const next = [...descriptions];
                            next[descriptionIndex] = value;

                            setValue(
                              `cooperationFormat.items.${index}.desc`,
                              next,
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          placeholder="Описание"
                          emptyText="Нет добавленных описаний"
                          error={
                            errors.cooperationFormat?.items?.[index]?.desc
                              ?.message
                          }
                        />

                        <Select
                          label="Тип отображения"
                          value={
                            watch(`cooperationFormat.items.${index}.as`) ??
                            "default"
                          }
                          items={contentAsItems}
                          onValueChange={(value) => {
                            setValue(
                              `cooperationFormat.items.${index}.as`,
                              value as "default" | "list",
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                        />

                        <Button
                          theme="secondary"
                          typeBtn="button"
                          onClick={() => cooperationFormatField.remove(index)}
                        >
                          <p className="p3">Удалить пункт</p>
                        </Button>
                      </div>
                    );
                  })}

                  <Button
                    theme="secondary"
                    typeBtn="button"
                    onClick={() =>
                      cooperationFormatField.append({
                        desc: [""],
                        as: "default",
                        title: "",
                      })
                    }
                  >
                    <p className="p3">Добавить пункт</p>
                  </Button>

                  <div className={scss["admin-form__item"]}>
                    <Check
                      {...register("cooperationFormat.showed")}
                      content={
                        <p className="p3">Показывать блок на странице</p>
                      }
                      error={errors.cooperationFormat?.showed?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Select
                      label="Размер блока"
                      value={watch("cooperationFormat.variant")}
                      items={contentVariantItems}
                      onValueChange={(value) => {
                        setValue(
                          "cooperationFormat.variant",
                          value as "small" | "big",
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                    />
                  </div>
                </div>
              ),
            },

            {
              key: "benefits",
              label: "Что вы получаете",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <Input
                      label="Заголовок"
                      {...register("benefits.title")}
                      error={errors.benefits?.title?.message}
                    />
                  </div>

                  {benefitsField.fields.map((field, index) => {
                    const descriptions =
                      watch(`benefits.items.${index}.desc`) ?? [];

                    return (
                      <div
                        key={field.id}
                        className={classNames(
                          scss["admin-form__item"],
                          scss["admin-form__item--big"],
                          scss["admin-form__item--bg"]
                        )}
                      >
                        <Input
                          label={`Заголовок пункта ${index + 1}`}
                          placeholder="Заголовок"
                          {...register(`benefits.items.${index}.title`)}
                          error={
                            errors.benefits?.items?.[index]?.title?.message
                          }
                        />

                        <MultiBoxTextField
                          label={`Пункт ${index + 1}`}
                          btnAddText="Добавить описание"
                          items={descriptions.map(
                            (value, descriptionIndex) => ({
                              id: `${field.id}-${descriptionIndex}`,
                              value,
                            })
                          )}
                          onAdd={() => {
                            setValue(
                              `benefits.items.${index}.desc`,
                              [...descriptions, ""],
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onRemove={(itemId) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            setValue(
                              `benefits.items.${index}.desc`,
                              descriptions.filter(
                                (_, currentIndex) =>
                                  currentIndex !== descriptionIndex
                              ),
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onUpdate={(itemId, value) => {
                            const descriptionIndex = Number(
                              String(itemId).split("-").pop()
                            );

                            const next = [...descriptions];
                            next[descriptionIndex] = value;

                            setValue(`benefits.items.${index}.desc`, next, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          placeholder="Описание"
                          emptyText="Нет добавленных описаний"
                          error={errors.benefits?.items?.[index]?.desc?.message}
                        />

                        <Select
                          label="Тип отображения"
                          value={
                            watch(`benefits.items.${index}.as`) ?? "default"
                          }
                          items={contentAsItems}
                          onValueChange={(value) => {
                            setValue(
                              `benefits.items.${index}.as`,
                              value as "default" | "list",
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                        />

                        <Button
                          theme="secondary"
                          typeBtn="button"
                          onClick={() => benefitsField.remove(index)}
                        >
                          <p className="p3">Удалить пункт</p>
                        </Button>
                      </div>
                    );
                  })}

                  <Button
                    theme="secondary"
                    typeBtn="button"
                    onClick={() =>
                      benefitsField.append({
                        desc: [""],
                        as: "default",
                        title: "",
                      })
                    }
                  >
                    <p className="p3">Добавить пункт</p>
                  </Button>

                  <div className={scss["admin-form__item"]}>
                    <Check
                      {...register("benefits.showed")}
                      content={
                        <p className="p3">Показывать блок на странице</p>
                      }
                      error={errors.benefits?.showed?.message}
                    />
                  </div>

                  <div className={scss["admin-form__item"]}>
                    <Select
                      label="Размер блока"
                      value={watch("benefits.variant")}
                      items={contentVariantItems}
                      onValueChange={(value) => {
                        setValue("benefits.variant", value as "small" | "big", {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                  </div>
                </div>
              ),
            },

            {
              key: "reviews",
              label: "Отзывы",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"],
                      scss["admin-form__cards"]
                    )}
                  >
                    {reviewsField.fields.map((field, index) => (
                      <div key={field.id} className={scss["admin-form__item"]}>
                        <Input
                          label="ID"
                          placeholder="review-1"
                          {...register(`reviews.${index}.id`)}
                          error={errors.reviews?.[index]?.id?.message}
                        />

                        <Input
                          label="Имя"
                          placeholder="Иван Иванов"
                          {...register(`reviews.${index}.name`)}
                          error={errors.reviews?.[index]?.name?.message}
                        />

                        <Input
                          label="Должность"
                          placeholder="Руководитель компании"
                          {...register(`reviews.${index}.post`)}
                          error={errors.reviews?.[index]?.post?.message}
                        />

                        <ImageUpload
                          label="Фото человека"
                          value={watch(`reviews.${index}.personImgSrc`) ?? ""}
                          onChange={(url) => {
                            setValue(`reviews.${index}.personImgSrc`, url, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          error={errors.reviews?.[index]?.personImgSrc?.message}
                        />

                        <MultiBoxTextField
                          label="Текст отзыва"
                          btnAddText="Добавить абзац"
                          items={(watch(`reviews.${index}.text`) ?? []).map(
                            (value, textIndex) => ({
                              id: `${field.id}-${textIndex}`,
                              value,
                            })
                          )}
                          onAdd={() => {
                            const text = watch(`reviews.${index}.text`) ?? [];

                            setValue(`reviews.${index}.text`, [...text, ""], {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          onRemove={(textId) => {
                            const text = watch(`reviews.${index}.text`) ?? [];

                            const textIndex = Number(
                              String(textId).split("-").pop()
                            );

                            setValue(
                              `reviews.${index}.text`,
                              text.filter(
                                (_, currentIndex) => currentIndex !== textIndex
                              ),
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onUpdate={(textId, value) => {
                            const text = watch(`reviews.${index}.text`) ?? [];

                            const textIndex = Number(
                              String(textId).split("-").pop()
                            );

                            const next = [...text];
                            next[textIndex] = value;

                            setValue(`reviews.${index}.text`, next, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          placeholder="Текст отзыва"
                          emptyText="Нет добавленного текста"
                          error={errors.reviews?.[index]?.text?.message}
                        />

                        <Input
                          label="Видео"
                          placeholder="URL видео"
                          {...register(`reviews.${index}.videoSrc`)}
                          error={errors.reviews?.[index]?.videoSrc?.message}
                        />

                        <Select
                          label="Тип видео"
                          value={watch(`reviews.${index}.type`)}
                          items={[
                            {
                              value: "url",
                              label: "Видео-файл",
                            },
                            {
                              value: "vk",
                              label: "VK Video",
                            },
                          ]}
                          onValueChange={(value) => {
                            setValue(
                              `reviews.${index}.type`,
                              value as "url" | "vk",
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                        />

                        <ImageUpload
                          label="Превью видео"
                          value={watch(`reviews.${index}.videoPoster`) ?? ""}
                          onChange={(url) => {
                            setValue(`reviews.${index}.videoPoster`, url, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          error={errors.reviews?.[index]?.videoPoster?.message}
                        />

                        <Button
                          theme="secondary"
                          typeBtn="button"
                          onClick={() => reviewsField.remove(index)}
                        >
                          <p className="p3">Удалить отзыв</p>
                        </Button>
                      </div>
                    ))}

                    <Button
                      theme="secondary"
                      typeBtn="button"
                      onClick={() =>
                        reviewsField.append({
                          id: crypto.randomUUID(),
                          name: "",
                          post: "",
                          text: [],
                          personImgSrc: "",
                          videoSrc: "",
                          videoPoster: "",
                          type: "url",
                        })
                      }
                    >
                      <p className="p3">Добавить отзыв</p>
                    </Button>
                  </div>
                </div>
              ),
            },

            {
              key: "details",
              label: "Детали",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div className={scss["admin-form__item"]}>
                    <Check
                      {...register("teamShowed")}
                      content={<p className="p3">Показывать блок с командой</p>}
                      error={errors.teamShowed?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>

      <div className={scss["admin-form__footer"]}>
        <div className={classNames(scss["admin-form__btns"])}>
          <Button
            theme="primary"
            size="medium"
            typeBtn="submit"
            disabled={isSubmitting}
          >
            <p className="p3">
              {isSubmitting
                ? "Сохранение..."
                : mode === "create"
                  ? "Создать"
                  : "Сохранить"}
            </p>
          </Button>
        </div>
      </div>
    </form>
  );
};
