package com.mobpvp.site.model.support;

import lombok.Data;

import java.util.*;

@Data
public class SupportForm {

    private List<String> answers = new LinkedList<>();

    public Map<Integer, String> buildAnswers() {
        Map<Integer, String> map = new HashMap<>();

        for (int i = 0; i < answers.size(); i++)
            map.put(i, answers.get(i));

        return map;
    }

}