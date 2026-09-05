"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

import { Button, Input, ImageUpload } from "@/shared/ui/index.ui";
import { useTeamQuery } from "../../model/useTeamsQuery";
import {
  useCreateTeam,
  useDeleteTeam,
  useUpdateTeam,
} from "../../model/useTeamMutations";

import {
  TeamFormValues,
  teamSchema,
  TeamFormInput,
} from "@/entities/team/model/team.schema";

import scss from "../../../../screens/admin/styles/AdminForm.module.scss";

interface TeamAdminFormProps {
  id?: string;
  mode: "create" | "edit";
}

export const TeamAdminForm = ({ id, mode }: TeamAdminFormProps) => {
  const router = useRouter();
  const isEdit = Boolean(id);

  const { data: team, isLoading } = useTeamQuery(id);
  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam(id ?? "");
  const deleteTeam = useDeleteTeam();

  const defaultValues = useMemo<TeamFormValues>(
    () => ({
      id: "",
      name: "",
      middlename: "",
      desc: "",
      post: "",
      img: "",
      imgAlt: "",
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
  } = useForm<TeamFormInput>({
    resolver: zodResolver(teamSchema),
    defaultValues,
  });

  useEffect(() => {
    if (team && isEdit) {
      reset({
        id: team.id,
        name: team.name,
        middlename: team.middlename,
        desc: team.desc,
        post: team.post,
        img: typeof team.img === "string" ? team.img : String(team.img.src),
        imgAlt: team.img.alt,
      });
    }
  }, [team, isEdit, reset]);

  const onSubmit = async (data: TeamFormInput) => {
    const parsed = teamSchema.parse(data);

    try {
      if (isEdit && id) {
        await updateTeam.mutateAsync(parsed);
      } else {
        await createTeam.mutateAsync(parsed);
      }

      router.push("/admin/teams");
    } catch (error) {
      console.error("Ошибка сохранения тимейта:", error);
    }
  };

  if (isEdit && isLoading) return <p className="p2">Загрузка тимейта...</p>;

  return (
    <form className={scss["admin-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={scss["admin-form__top"]}>
        <Button
          theme="secondary"
          iconLeft={<ArrowLeft size={18} />}
          onClick={() => router.push("/admin/teams")}
        >
          <p className="p2">Назад к команде</p>
        </Button>

        <h1 className="h4">
          {isEdit
            ? `Редактирование: ${team?.name}`
            : "Создание участника команды"}
        </h1>
      </div>

      <div className={scss["admin-form__content"]}>
        <div className={scss["admin-form__inputs"]}>
          <div className={scss["admin-form__item"]}>
            <Input
              label="ID"
              placeholder="marina-test"
              {...register("id")}
              error={errors.id?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Имя"
              placeholder="Марина"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Отчество"
              placeholder="Тест"
              {...register("middlename")}
              error={errors.middlename?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Должность"
              placeholder="Executive Coach"
              {...register("post")}
              error={errors.post?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Описание"
              placeholder="Коуч уровня PCC ICF,"
              {...register("desc")}
              error={errors.desc?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <ImageUpload
              value={watch("img")}
              onChange={(url) => {
                setValue("img", url, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              label="Фото"
              error={errors.img?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Описание фото"
              placeholder="Описание фото"
              {...register("imgAlt")}
              error={errors.imgAlt?.message}
            />
          </div>
        </div>
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
