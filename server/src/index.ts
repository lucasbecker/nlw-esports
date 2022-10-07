import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    },
    orderBy: { title: 'asc' },
  });

  return response.json(games);
});

app.get('/games/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const gameWithAds = await prisma.game.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        ads: {
          select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
          }
        },
      },
      orderBy: { title: 'asc' },
    });

    gameWithAds.ads.forEach((ad: any) => {
      ad.weekDays = ad.weekDays.split(',');
      ad.hourStart = convertMinutesToHourString(ad.hourStart);
      ad.hourEnd = convertMinutesToHourString(ad.hourEnd);
    })

    return response.json(gameWithAds);
  } catch {
    return response
      .status(404)
      .json({
        message: "Game não encontrado."
      });
  }
});

app.post('/games/:id/ads', async(request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      ...body,
      gameId,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd)
    },
  });

  return response.status(201).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId: string = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return response.json(ads.map((ad: any) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    };
  }));
});

app.get('/ads/:id/discord', async (request, response) => {
  const id = request.params.id;

  try {
    const discord = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id,
      }
    });

    return response
      .json(discord);
  } catch {
    return response
      .status(404)
      .json({
        message: "Discord não encontrado."
      });
  }
});

app.listen(3333);
