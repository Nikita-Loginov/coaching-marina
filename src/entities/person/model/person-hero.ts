export type PersonHero = {
  badge: string;
  title: string;
  titleAccent: string;
  desc: string[];
};

export const defaultPersonHero: PersonHero = {
  badge: "ПЕРСОНАЛЬНЫЙ КОУЧИНГ | ОБУЧЕНИЕ | РАЗВИТИЕ КОМАНД",
  title: "Школа",
  titleAccent: "управленческого развития",
  desc: [
    "Сильное решение начинается с точного ответа на вопрос, что действительно требует вашего внимания.\nЧем выше ставки, тем важнее не ошибиться в главном.",
    "Для меня коучинг собственников бизнеса и топ-менеджеров - это партнерство в мышлении там, где нет простых ответов, где можно выйти за границы привычного взгляда, увидеть суть и найти сильное решение, какими бы сложными ни были обстоятельства.",
  ],
};

export const resolvePersonHero = (hero?: PersonHero | null): PersonHero => {
  if (!hero?.title?.trim() || !hero.badge?.trim() || !hero.desc?.length) {
    return defaultPersonHero;
  }

  return {
    badge: hero.badge,
    title: hero.title,
    titleAccent: hero.titleAccent ?? "",
    desc: hero.desc,
  };
};
