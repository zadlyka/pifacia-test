import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

export interface PaginateLink {
    prev_page_url: string;
    next_page_url: string;
    path: string;
    current_page: number;
}

export default function Paginate({
    paginateLink,
    className,
}: {
    paginateLink: PaginateLink;
    className?: string;
}) {
    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={paginateLink.prev_page_url} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        href={`${paginateLink.path}?page=${paginateLink.current_page}`}
                    >
                        {paginateLink.current_page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={paginateLink.next_page_url} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
