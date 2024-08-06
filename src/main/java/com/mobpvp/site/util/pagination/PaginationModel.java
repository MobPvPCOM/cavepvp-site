package com.mobpvp.site.util.pagination;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class PaginationModel<T> {

    private final int modelsPerPage;
    private final List<T> models;

    public PaginationModel(int modelsPerPage, List<T> models) {
        if (modelsPerPage <= 0)
            throw new IllegalArgumentException("Models per page must be positive.");

        this.modelsPerPage = modelsPerPage;
        this.models = models;
    }

    public int getPages() {
        return (int) Math.ceil((double) models.size() / modelsPerPage);
    }

    public int getNextPage(int currentPage) {
        return Math.min(currentPage + 1, this.getPages());
    }

    public int getLastPage(int currentPage) {
        return Math.max(currentPage - 1, 1);
    }

    public List<T> getPage(int page) {
        int pagesRequired = this.getPages();
        page = Math.max(Math.min(page, pagesRequired), 1);

        if (models.isEmpty())
            return new ArrayList<>();

        int startIndex = (page - 1) * modelsPerPage;
        int endIndex = Math.min(page * modelsPerPage, models.size());

        return new ArrayList<>(models.subList(startIndex, endIndex));
    }

    public void addModels(List<T> ts) {
        models.addAll(ts);
    }

    public void addModel(T t) {
        models.add(t);
    }
}
