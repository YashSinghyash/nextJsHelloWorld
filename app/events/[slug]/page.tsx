import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/app/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { IEvent } from "@/database";
import EventCard from "@/app/components/EventCard";
import { Suspense } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetalItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul className="space-y-2">
      {agendaItems.map((item, index) => (
        <li key={index} className="agenda-item">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  const { event } = await request.json();
  const {
    _id,
    description,
    image,
    overview,
    date,
    time,
    audience,
    location,
    mode,
    agenda,
    tags,
    organizer,
    slug: eventSlug,
  } = event;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  const bookings = 10;

  if (!description) return notFound();
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        {/* Left Side - Event Content */}
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          ></Image>
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2> Event Details</h2>
            <EventDetalItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetalItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetalItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetalItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetalItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2> About the organisation</h2>
            <p> {organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* Right Side - Event Content */}

        <aside className="booking">
          <div className="signup-card">
            <h2>Book your spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent eventId={_id.toString()} slug={eventSlug} />
          </div>
        </aside>
      </div>
      <div className="fkex w-full flex-col gap-4 pt-20">
        <h2> Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => {
              // Serialize the event data to plain objects
              const plainEvent = {
                ...similarEvent,
                _id: similarEvent._id.toString(),
                createdAt:
                  typeof similarEvent.createdAt === "string"
                    ? similarEvent.createdAt
                    : similarEvent.createdAt.toISOString(),
                updatedAt:
                  typeof similarEvent.updatedAt === "string"
                    ? similarEvent.updatedAt
                    : similarEvent.updatedAt.toISOString(),
              };
              return (
                <EventCard key={similarEvent._id.toString()} {...plainEvent} />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
