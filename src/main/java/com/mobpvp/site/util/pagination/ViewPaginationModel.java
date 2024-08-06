package com.mobpvp.site.util.pagination;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Getter
@Setter
public class ViewPaginationModel<T> extends PaginationModel<T> {

    private int currentPage;
    private String key;

    public ViewPaginationModel(int currentPage, int modelsPerPage, List<T> models, String key) {
        super(modelsPerPage, models);
        this.currentPage = currentPage;
        this.key = key;
    }

    public int getNextPage() {
        return getNextPage(currentPage);
    }

    public int getLastPage() {
        return getLastPage(currentPage);
    }

    public void applyTo(ModelAndView view, String pageUrl) {
        view.addObject(key, getPage(currentPage));
        view.addObject("pageCount", getPages());
        view.addObject("nextPage", getNextPage());
        view.addObject("currentPage", currentPage);
        view.addObject("previousPage", getLastPage());

        view.addObject(
                "nextPageUrl",
                pageUrl.replace("{page}", getNextPage() + "")
        );

        view.addObject(
                "previousPageUrl",
                pageUrl.replace("{page}", getLastPage() + "")
        );
    }

}
