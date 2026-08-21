"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Button,
  Input,
  MultiBoxTextField,
  MultiBoxTitleDescriptionField,
  Accordeon,
  FileUpload,
} from "@/shared/ui/index.ui";

import { useOrgsQuery } from "../../model/useOrgsMutations";
import { useUpdateOrgs } from "../../model/useOrgsQuery";

import {
  OrgsFormValues,
  PersonFormValues,
  personSchema,
  type OrgsFormInput,
} from "@/entities/person/model/person.schema";

import scss from "../../../../screens/admin/styles/AdminForm.module.scss";
import classNames from "classnames";

export const OrgsAdminForm = () => {
  const router = useRouter();

  const { data: person, isLoading } = useOrgsQuery();

  const updatePerson = useUpdateOrgs();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrgsFormInput, unknown, OrgsFormValues>({
    resolver: zodResolver(personSchema),

    defaultValues: {
      id: "main",

      name: "",
      middlename: "",
      fullname: "",
      post: "",

      clients: "",
      countAreas: 0,

      license: "",

      about: {
        desc: [],
        title: "",
        experience: "",
        images: [],
      },

      contacts: {
        email: "",
        phone: "",
        website: "",
        address: {
          label: "",
          link: "",
        },
      },

      socials: {
        telegram: "",
        vk: "",
      },

      practice: {
        label: "",
        experience: "",
        clients: "",
        countAreas: 0,
      },

      organization: {
        title: "",
        items: [],
      },

      management: {
        title: "",
        items: [],
      },

      education: {
        title: "",
        items: [],
      },

      materialTechnicalSupport: {
        title: "",
        items: [],
      },

      paidEducationalServices: {
        title: "",
        items: [],
      },

      financialActivity: {
        title: "",
        items: [],
      },

      vacantPlaces: {
        title: "",
        items: [],
      },

      studentSupport: {
        title: "",
        items: [],
      },

      internationalCooperation: {
        title: "",
        items: [],
      },

      documents: [],
    },
  });

  const aboutDesc = watch("about.desc") ?? [];

  const organizationField = useFieldArray({
    control,
    name: "organization.items",
  });

  const managementField = useFieldArray({
    control,
    name: "management.items",
  });

  const materialTechnicalSupportField = useFieldArray({
    control,
    name: "materialTechnicalSupport.items",
  });

  const paidEducationalServicesField = useFieldArray({
    control,
    name: "paidEducationalServices.items",
  });

  const financialActivityField = useFieldArray({
    control,
    name: "financialActivity.items",
  });

  const vacantPlacesField = useFieldArray({
    control,
    name: "vacantPlaces.items",
  });

  const studentSupportField = useFieldArray({
    control,
    name: "studentSupport.items",
  });

  const internationalCooperationField = useFieldArray({
    control,
    name: "internationalCooperation.items",
  });

  const documentsField = useFieldArray({
    control,
    name: "documents",
  });

  const educationField = useFieldArray({
    control,
    name: "education.items",
  });

  useEffect(() => {
    if (!person) return;

    reset(person);
  }, [person, reset]);

  const onSubmit = async (data: PersonFormValues) => {
    try {
      await updatePerson.mutateAsync(data);

      // router.push("/admin/orgs");
      toast.success("Данные успешно измененены");
    } catch (error) {
      console.error("Ошибка сохранения данных организации:", error);
    }
  };

  if (isLoading) {
    return <p className="p2">Загрузка...</p>;
  }

  return (
    <form className={scss["admin-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={scss["admin-form__top"]}>
        <Button
          theme="secondary"
          iconLeft={<ArrowLeft size={18} />}
          typeBtn="button"
          onClick={() => router.push("/admin")}
        >
          <p className="p2">Назад</p>
        </Button>

        <h1 className="h4">Редактирование информации</h1>
      </div>

      <div className={scss["admin-form__content"]}>
        <Accordeon
          items={[
            {
              key: "1",
              label: "Основная информация",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <Input
                    label="Имя"
                    placeholder="Марина"
                    {...register("name")}
                    error={errors.name?.message}
                  />

                  <Input
                    label="Отчество"
                    placeholder="Ягунова"
                    {...register("middlename")}
                    error={errors.middlename?.message}
                  />

                  <Input
                    label="Полное имя"
                    placeholder="Ягунова Марина Григорьевна"
                    {...register("fullname")}
                    error={errors.fullname?.message}
                  />

                  <Input
                    label="Должность"
                    placeholder="Командный коуч ICF"
                    {...register("post")}
                    error={errors.post?.message}
                  />

                  <Input
                    label="Количество клиентов"
                    placeholder="500+"
                    {...register("clients")}
                    error={errors.clients?.message}
                  />

                  <Input
                    label="Количество направлений"
                    typeInput="text"
                    {...register("countAreas")}
                    error={errors.countAreas?.message}
                  />

                  <Input
                    label="Лицензия"
                    placeholder="Л035-01255-50/01533168"
                    {...register("license")}
                    error={errors.license?.message}
                  />
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "2",
              label: "О себе",
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
                      as="textarea"
                      {...register("about.title")}
                      error={errors.about?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <Input
                      label="Опыт"
                      {...register("about.experience")}
                      error={errors.about?.experience?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTextField
                      label="Описание"
                      btnAddText="Добавить описание"
                      items={aboutDesc.map((value, index) => ({
                        id: String(index),
                        value,
                      }))}
                      onAdd={() => {
                        setValue("about.desc", [...aboutDesc, ""], {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      onRemove={(id) => {
                        const index = Number(id);

                        setValue(
                          "about.desc",
                          aboutDesc.filter((_, i) => i !== index),
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                      onUpdate={(id, value) => {
                        const index = Number(id);

                        const next = [...aboutDesc];
                        next[index] = value;

                        setValue("about.desc", next, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      placeholder="Описание"
                      emptyText="Нет добавленных описаний"
                      error={errors.about?.desc?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "3",
              label: "Контакты",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <Input
                    label="Email"
                    {...register("contacts.email")}
                    error={errors.contacts?.email?.message}
                  />

                  <Input
                    label="Телефон"
                    {...register("contacts.phone")}
                    error={errors.contacts?.phone?.message}
                  />

                  <Input
                    label="Сайт"
                    {...register("contacts.website")}
                    error={errors.contacts?.website?.message}
                  />

                  <Input
                    label="Адрес"
                    {...register("contacts.address.label")}
                    error={errors.contacts?.address?.label?.message}
                  />

                  <Input
                    label="Ссылка на карту"
                    {...register("contacts.address.link")}
                    error={errors.contacts?.address?.link?.message}
                  />
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "4",
              label: "Социальные сети",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <Input
                    label="Telegram"
                    {...register("socials.telegram")}
                    error={errors.socials?.telegram?.message}
                  />

                  <Input
                    label="VK"
                    {...register("socials.vk")}
                    error={errors.socials?.vk?.message}
                  />
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "5",
              label: "Практика",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <Input
                    label="Подпись"
                    {...register("practice.label")}
                    error={errors.practice?.label?.message}
                  />

                  <Input
                    label="Опыт"
                    {...register("practice.experience")}
                    error={errors.practice?.experience?.message}
                  />

                  <Input
                    label="Клиенты"
                    {...register("practice.clients")}
                    error={errors.practice?.clients?.message}
                  />

                  <Input
                    label="Количество направлений"
                    typeInput="text"
                    {...register("practice.countAreas", {
                      valueAsNumber: true,
                    })}
                    error={errors.practice?.countAreas?.message}
                  />
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "6",
              label: "Организация",
              children: (
                <div className={scss["admin-form__inputs"]}>
                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <Input
                      label="Заголовок организации"
                      {...register("organization.title")}
                      error={errors.organization?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTitleDescriptionField
                      label="Общие сведения"
                      btnAddText="Добавить пункт"
                      items={organizationField.fields.map((field, index) => ({
                        id: field.id,
                        title: watch(`organization.items.${index}.title`) || "",
                        description:
                          watch(`organization.items.${index}.description`) ||
                          "",
                      }))}
                      onAdd={() =>
                        organizationField.append({
                          title: "",
                          description: "",
                        })
                      }
                      onRemove={(id) => {
                        const index = organizationField.fields.findIndex(
                          (field) => field.id === id
                        );

                        if (index !== -1) {
                          organizationField.remove(index);
                        }
                      }}
                      onUpdate={(id, field, value) => {
                        const index = organizationField.fields.findIndex(
                          (item) => item.id === id
                        );

                        if (index !== -1) {
                          setValue(
                            `organization.items.${index}.${field}`,
                            value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      titlePlaceholder="Название пункта"
                      descriptionPlaceholder="Описание"
                      emptyText="Нет добавленных пунктов"
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "7",
              label: "Структура и органы управления",
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
                      {...register("management.title")}
                      error={errors.management?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTitleDescriptionField
                      label="Структура и органы управления"
                      btnAddText="Добавить пункт"
                      items={managementField.fields.map((field, index) => ({
                        id: field.id,
                        title: watch(`management.items.${index}.title`) || "",
                        description:
                          watch(`management.items.${index}.description`) || "",
                      }))}
                      onAdd={() =>
                        managementField.append({
                          title: "",
                          description: "",
                        })
                      }
                      onRemove={(id) => {
                        const index = managementField.fields.findIndex(
                          (field) => field.id === id
                        );

                        if (index !== -1) {
                          managementField.remove(index);
                        }
                      }}
                      onUpdate={(id, field, value) => {
                        const index = managementField.fields.findIndex(
                          (item) => item.id === id
                        );

                        if (index !== -1) {
                          setValue(
                            `management.items.${index}.${field}`,
                            value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      titlePlaceholder="Название пункта"
                      descriptionPlaceholder="Описание"
                      emptyText="Нет добавленных пунктов"
                      error={errors.management?.items?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "8",
              label: "Образование",
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
                      {...register("education.title")}
                      error={errors.education?.title?.message}
                    />
                  </div>

                  {educationField.fields.map((field, index) => {
                    const educationItems =
                      watch(`education.items.${index}.items`) ?? [];

                    return (
                      <div
                        key={field.id}
                        className={classNames(
                          scss["admin-form__item"],
                          scss["admin-form__item--big"]
                        )}
                      >
                        <Input
                          label="Раздел образования"
                          value={watch(`education.items.${index}.title`) ?? ""}
                          onChange={(event) => {
                            setValue(
                              `education.items.${index}.title`,
                              event.target.value,
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          error={
                            errors.education?.items?.[index]?.title?.message
                          }
                        />

                        <MultiBoxTitleDescriptionField
                          label="Сведения"
                          btnAddText="Добавить сведения"
                          items={educationItems.map((item, itemIndex) => ({
                            id: `${field.id}-${itemIndex}`,
                            title: item.title ?? "",
                            description: item.description ?? "",
                          }))}
                          onAdd={() => {
                            setValue(
                              `education.items.${index}.items`,
                              [
                                ...educationItems,
                                {
                                  title: "",
                                  description: "",
                                },
                              ],
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onRemove={(itemId) => {
                            const itemIndex = educationItems.findIndex(
                              (_, itemIndex) =>
                                `${field.id}-${itemIndex}` === itemId
                            );

                            if (itemIndex === -1) return;

                            setValue(
                              `education.items.${index}.items`,
                              educationItems.filter(
                                (_, currentIndex) => currentIndex !== itemIndex
                              ),
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          onUpdate={(itemId, itemField, value) => {
                            const itemIndex = educationItems.findIndex(
                              (_, itemIndex) =>
                                `${field.id}-${itemIndex}` === itemId
                            );

                            if (itemIndex === -1) return;

                            setValue(
                              `education.items.${index}.items.${itemIndex}.${itemField}`,
                              value,
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              }
                            );
                          }}
                          titlePlaceholder="Период / год"
                          descriptionPlaceholder="Описание"
                          emptyText="Нет добавленных сведений"
                        />

                        <Button
                          theme="secondary"
                          typeBtn="button"
                          onClick={() => educationField.remove(index)}
                        >
                          <p className="p3">Удалить раздел</p>
                        </Button>
                      </div>
                    );
                  })}

                  <Button
                    theme="secondary"
                    typeBtn="button"
                    onClick={() =>
                      educationField.append({
                        title: "",
                        items: [
                          {
                            title: "",
                            description: "",
                          },
                        ],
                      })
                    }
                  >
                    <p className="p3">Добавить раздел образования</p>
                  </Button>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "9",
              label: "Материально-техническое обеспечение",
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
                      {...register("materialTechnicalSupport.title")}
                      error={errors.materialTechnicalSupport?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTitleDescriptionField
                      label="Сведения"
                      btnAddText="Добавить пункт"
                      items={materialTechnicalSupportField.fields.map(
                        (field, index) => ({
                          id: field.id,
                          title:
                            watch(
                              `materialTechnicalSupport.items.${index}.title`
                            ) ?? "",
                          description:
                            watch(
                              `materialTechnicalSupport.items.${index}.description`
                            ) ?? "",
                        })
                      )}
                      onAdd={() =>
                        materialTechnicalSupportField.append({
                          title: "",
                          description: "",
                        })
                      }
                      onRemove={(id) => {
                        const index =
                          materialTechnicalSupportField.fields.findIndex(
                            (field) => field.id === id
                          );

                        if (index !== -1) {
                          materialTechnicalSupportField.remove(index);
                        }
                      }}
                      onUpdate={(id, field, value) => {
                        const index =
                          materialTechnicalSupportField.fields.findIndex(
                            (item) => item.id === id
                          );

                        if (index !== -1) {
                          setValue(
                            `materialTechnicalSupport.items.${index}.${field}`,
                            value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      titlePlaceholder="Название пункта"
                      descriptionPlaceholder="Описание"
                      emptyText="Нет добавленных пунктов"
                      error={errors.materialTechnicalSupport?.items?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "10",
              label: "Платные образовательные услуги",
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
                      {...register("paidEducationalServices.title")}
                      error={errors.paidEducationalServices?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTitleDescriptionField
                      label="Услуги"
                      btnAddText="Добавить услугу"
                      items={paidEducationalServicesField.fields.map(
                        (field, index) => ({
                          id: field.id,
                          title:
                            watch(
                              `paidEducationalServices.items.${index}.title`
                            ) ?? "",
                          description:
                            watch(
                              `paidEducationalServices.items.${index}.description`
                            ) ?? "",
                        })
                      )}
                      onAdd={() =>
                        paidEducationalServicesField.append({
                          title: "",
                          description: "",
                        })
                      }
                      onRemove={(id) => {
                        const index =
                          paidEducationalServicesField.fields.findIndex(
                            (field) => field.id === id
                          );

                        if (index !== -1) {
                          paidEducationalServicesField.remove(index);
                        }
                      }}
                      onUpdate={(id, field, value) => {
                        const index =
                          paidEducationalServicesField.fields.findIndex(
                            (item) => item.id === id
                          );

                        if (index !== -1) {
                          setValue(
                            `paidEducationalServices.items.${index}.${field}`,
                            value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      titlePlaceholder="Название услуги"
                      descriptionPlaceholder="Стоимость / описание"
                      emptyText="Нет добавленных услуг"
                      error={errors.paidEducationalServices?.items?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "11",
              label: "Финансово-хозяйственная деятельность",
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
                      {...register("financialActivity.title")}
                      error={errors.financialActivity?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTitleDescriptionField
                      label="Сведения"
                      btnAddText="Добавить пункт"
                      items={financialActivityField.fields.map(
                        (field, index) => ({
                          id: field.id,
                          title:
                            watch(`financialActivity.items.${index}.title`) ??
                            "",
                          description:
                            watch(
                              `financialActivity.items.${index}.description`
                            ) ?? "",
                        })
                      )}
                      onAdd={() =>
                        financialActivityField.append({
                          title: "",
                          description: "",
                        })
                      }
                      onRemove={(id) => {
                        const index = financialActivityField.fields.findIndex(
                          (field) => field.id === id
                        );

                        if (index !== -1) {
                          financialActivityField.remove(index);
                        }
                      }}
                      onUpdate={(id, field, value) => {
                        const index = financialActivityField.fields.findIndex(
                          (item) => item.id === id
                        );

                        if (index !== -1) {
                          setValue(
                            `financialActivity.items.${index}.${field}`,
                            value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      titlePlaceholder="Название пункта"
                      descriptionPlaceholder="Описание"
                      emptyText="Нет добавленных пунктов"
                      error={errors.financialActivity?.items?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "12",
              label: "Вакантные места для приема (перевода) обучающихся",
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
                      {...register("vacantPlaces.title")}
                      error={errors.vacantPlaces?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTitleDescriptionField
                      label="Сведения"
                      btnAddText="Добавить пункт"
                      items={vacantPlacesField.fields.map((field, index) => ({
                        id: field.id,
                        title: watch(`vacantPlaces.items.${index}.title`) || "",
                        description:
                          watch(`vacantPlaces.items.${index}.description`) ||
                          "",
                      }))}
                      onAdd={() =>
                        vacantPlacesField.append({
                          title: "",
                          description: "",
                        })
                      }
                      onRemove={(id) => {
                        const index = vacantPlacesField.fields.findIndex(
                          (field) => field.id === id
                        );

                        if (index !== -1) {
                          vacantPlacesField.remove(index);
                        }
                      }}
                      onUpdate={(id, field, value) => {
                        const index = vacantPlacesField.fields.findIndex(
                          (item) => item.id === id
                        );

                        if (index !== -1) {
                          setValue(
                            `vacantPlaces.items.${index}.${field}`,
                            value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      titlePlaceholder="Название пункта"
                      descriptionPlaceholder="Описание"
                      emptyText="Нет добавленных пунктов"
                      error={errors.vacantPlaces?.items?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "13",
              label: "Стипендия и меры поддержки обучающихся",
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
                      {...register("studentSupport.title")}
                      error={errors.studentSupport?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTitleDescriptionField
                      label="Сведения"
                      btnAddText="Добавить пункт"
                      items={studentSupportField.fields.map((field, index) => ({
                        id: field.id,
                        title:
                          watch(`studentSupport.items.${index}.title`) || "",
                        description:
                          watch(`studentSupport.items.${index}.description`) ||
                          "",
                      }))}
                      onAdd={() =>
                        studentSupportField.append({
                          title: "",
                          description: "",
                        })
                      }
                      onRemove={(id) => {
                        const index = studentSupportField.fields.findIndex(
                          (field) => field.id === id
                        );

                        if (index !== -1) {
                          studentSupportField.remove(index);
                        }
                      }}
                      onUpdate={(id, field, value) => {
                        const index = studentSupportField.fields.findIndex(
                          (item) => item.id === id
                        );

                        if (index !== -1) {
                          setValue(
                            `studentSupport.items.${index}.${field}`,
                            value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      titlePlaceholder="Название пункта"
                      descriptionPlaceholder="Описание"
                      emptyText="Нет добавленных пунктов"
                      error={errors.studentSupport?.items?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "14",
              label: "Международное сотрудничество",
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
                      {...register("internationalCooperation.title")}
                      error={errors.internationalCooperation?.title?.message}
                    />
                  </div>

                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__item--big"]
                    )}
                  >
                    <MultiBoxTitleDescriptionField
                      label="Сведения"
                      btnAddText="Добавить пункт"
                      items={internationalCooperationField.fields.map(
                        (field, index) => ({
                          id: field.id,
                          title:
                            watch(
                              `internationalCooperation.items.${index}.title`
                            ) || "",
                          description:
                            watch(
                              `internationalCooperation.items.${index}.description`
                            ) || "",
                        })
                      )}
                      onAdd={() =>
                        internationalCooperationField.append({
                          title: "",
                          description: "",
                        })
                      }
                      onRemove={(id) => {
                        const index =
                          internationalCooperationField.fields.findIndex(
                            (field) => field.id === id
                          );

                        if (index !== -1) {
                          internationalCooperationField.remove(index);
                        }
                      }}
                      onUpdate={(id, field, value) => {
                        const index =
                          internationalCooperationField.fields.findIndex(
                            (item) => item.id === id
                          );

                        if (index !== -1) {
                          setValue(
                            `internationalCooperation.items.${index}.${field}`,
                            value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      titlePlaceholder="Название пункта"
                      descriptionPlaceholder="Описание"
                      emptyText="Нет добавленных пунктов"
                      error={errors.internationalCooperation?.items?.message}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <Accordeon
          items={[
            {
              key: "15",
              label: "Правовые документы",
              children: (
                <div
                  className={classNames(
                    scss["admin-form__inputs"],
                    scss["admin-form__inputs--full"]
                  )}
                >
                  <div
                    className={classNames(
                      scss["admin-form__item"],
                      scss["admin-form__documents"]
                    )}
                  >
                    {documentsField.fields.map((field, index) => {
                      const descriptions =
                        watch(`documents.${index}.description`) || [];

                      return (
                        <div
                          key={field.id}
                          className={scss["admin-form__item"]}
                        >
                          <Input
                            label="Название документа"
                            {...register(`documents.${index}.name`)}
                            error={errors.documents?.[index]?.name?.message}
                          />

                          <MultiBoxTextField
                            label="Описание"
                            btnAddText="Добавить описание"
                            items={descriptions.map(
                              (value, descriptionIndex) => ({
                                id: `${field.id}-${descriptionIndex}`,
                                value,
                              })
                            )}
                            onAdd={() => {
                              setValue(
                                `documents.${index}.description`,
                                [...descriptions, ""],
                                {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                }
                              );
                            }}
                            onRemove={(id) => {
                              const descriptionIndex = Number(
                                String(id).split("-").pop()
                              );

                              setValue(
                                `documents.${index}.description`,
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
                            onUpdate={(id, value) => {
                              const descriptionIndex = Number(
                                String(id).split("-").pop()
                              );

                              const next = [...descriptions];
                              next[descriptionIndex] = value;

                              setValue(`documents.${index}.description`, next, {
                                shouldDirty: true,
                                shouldValidate: true,
                              });
                            }}
                            placeholder="Описание документа"
                            emptyText="Нет добавленных описаний"
                            error={
                              errors.documents?.[index]?.description?.message
                            }
                          />

                          <FileUpload
                            label="Документ"
                            value={watch(`documents.${index}.file`)}
                            onChange={(url) => {
                              setValue(`documents.${index}.file`, url, {
                                shouldDirty: true,
                                shouldValidate: true,
                              });
                            }}
                            error={errors.documents?.[index]?.file?.message}
                          />

                          <Button
                            theme="secondary"
                            typeBtn="button"
                            onClick={() => documentsField.remove(index)}
                          >
                            <p className="p3">Удалить документ</p>
                          </Button>
                        </div>
                      );
                    })}

                    <Button
                      theme="secondary"
                      typeBtn="button"
                      onClick={() =>
                        documentsField.append({
                          id: crypto.randomUUID(),
                          name: "",
                          description: [""],
                          file: "",
                        })
                      }
                    >
                      <p className="p3">Добавить документ</p>
                    </Button>
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
            <p className="p3">{isSubmitting ? "Сохранение..." : "Сохранить"}</p>
          </Button>
        </div>
      </div>
    </form>
  );
};
