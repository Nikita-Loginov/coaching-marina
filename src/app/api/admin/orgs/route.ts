import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { PrismaClient } from "@/generated/client";

const prisma = new PrismaClient();

const PERSON_ID = "main";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const person = await prisma.person.findUnique({
      where: {
        id: PERSON_ID,
      },
    });

    if (!person) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json(person);
  } catch (error) {
    console.error("GET /api/admin/orgs ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const person = await prisma.person.update({
      where: {
        id: PERSON_ID,
      },
      data: {
        name: body.name,
        middlename: body.middlename,
        fullname: body.fullname,
        post: body.post,
        clients: body.clients,
        countAreas: body.countAreas,
        license: body.license,

        about: body.about,
        contacts: body.contacts,
        socials: body.socials,
        practice: body.practice,
        organization: body.organization,
        management: body.management,
        education: body.education,
        materialTechnicalSupport: body.materialTechnicalSupport,
        paidEducationalServices: body.paidEducationalServices,
        financialActivity: body.financialActivity,
        vacantPlaces: body.vacantPlaces,
        studentSupport: body.studentSupport,
        internationalCooperation: body.internationalCooperation,
        documents: body.documents,
      },
    });

    return NextResponse.json(person);
  } catch (error) {
    console.error("PATCH /api/admin/orgs ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
