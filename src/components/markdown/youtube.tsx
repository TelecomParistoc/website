export default function YouTube({ id }: { id: string }) {
    return (
        <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}
